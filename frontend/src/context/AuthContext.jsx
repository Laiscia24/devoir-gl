import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();
const BASE_URL = "http://localhost:8800";

const initialState = {user: null, isAuthenticated: false};
function reducer(state, action){
    switch (action.type){
        case "login": 
            return {...state, user: action.payload, isAuthenticated: true};
        case "logout":
            localStorage.removeItem("token");
            return {...state, user: null, isAuthenticated: false};
        default: 
            throw new Error("Action inconnue");
    }
}


function AuthProvider({children}){
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);
    useEffect(function(){
       const token = localStorage.getItem("token");
       if(token){
        dispatch({type: "login", payload: null});
       } 
    }, [])

    async function login(email, mot_de_passe){
        try {
            const res = await axios.post(`${BASE_URL}/login`, {email, mot_de_passe});

            console.log(res);
            const token = res.data.token;
            localStorage.setItem("token", token);
            dispatch({type: "login", payload: null});
        } catch (error) {
            console.log(error);
        }
    }

    async function getUserData() {
        try {
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("No token found");
            }

            const res = await axios.get(`${BASE_URL}/connectedUser`, {
                headers: {Authorization: `Bearer ${token}`,},
            });
            dispatch({type: "login", payload: res.data});
        } catch (error) {
            console.log(error);
        }
    }

    function logout(){
        dispatch({type:"logout"});
    }

    return <AuthContext.Provider value={{user, isAuthenticated, login, logout, getUserData}}>
        {children}
    </AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error("AuthContext utilise a l'exterieur");
    return context;
}

export {AuthProvider, useAuth};