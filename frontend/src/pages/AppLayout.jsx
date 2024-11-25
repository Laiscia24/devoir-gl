import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";


const AppLayout = () => {
    const {logout, getUserData, user} = useAuth();

    function handleLogout(){
        logout();
    }

    
    useEffect(()=>{
        getUserData();
    }, [])
    
    return <div className="font-serif">
        <div className="bg-green-300 w-full h-20 flex items-center py-5">
            <h1 className="font-bold text-3xl absolute left-16">EVALUATION DES ELEVES</h1>
            <div className="absolute right-20">
                <span>{user ? user.nom : ""}</span>
                <span className="mx-3">|</span>
                <button  className=" hover:underline" onClick={(e)=>handleLogout()}>Deconnexion</button>
            </div>
            
        </div>
        <div className="border-r items-center h-auto w-full p-1 bg-gray-100">
            <ul className="ml-48 flex">
                <li className="mx-5 hover:underline"><NavLink to="etudiant">Etudiant</NavLink></li>
                <li className="mx-5 hover:underline"><NavLink to="classe">Classe</NavLink></li>
                <li className="mx-5 hover:underline"><NavLink to="utilisateur">Utilisateur</NavLink></li>
            </ul>
        </div>
        <div className="p-4 w-full">
        <Outlet/> 
        </div>
    </div>
}

export default AppLayout;