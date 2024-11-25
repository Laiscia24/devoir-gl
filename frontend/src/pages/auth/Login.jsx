import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = ()  => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();

        if(email && password) login(email, password);
    }

    useEffect(function(){
        if(isAuthenticated) navigate("/app", {replace:true});
    }, [isAuthenticated, navigate]);


    return <div className="bg-green-300 w-full h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start bg-white rounded-lg shadow-lg px-5 w-1/3">
            <h1 className="text-xl font-bold my-5">Se connecter</h1>
            <div className="flex flex-col my-1 w-full">
                <label className="font-semibold ">Email</label>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="py-1 px-2 outline-none border-[1px] border-gray-600 rounded-sm" />
            </div>
            <div className="flex flex-col my-1 w-full">
                <label className="font-semibold ">Mot de passe</label>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="py-1 px-2 outline-none border-[1px] border-gray-600 rounded-sm"/>
            </div>
            <div className="my-5 bg-red-500 text-white font-bold rounded-md hover:bg-red-400">
                <button className="py-2 px-4">Connexion</button>
            </div>
        </form>

    </div>
}
export default Login;