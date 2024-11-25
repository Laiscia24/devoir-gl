import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Utilisateur = ({BASE_URL}) => {
    const {user} = useAuth();

    const [utilisateurs, setUtilisateur] = useState([]);
    const [id_util, setIdUtil] = useState("");
    const [nom_util, setNomUtil] = useState("");
    const [email, setEmail] = useState("");
    const [type_util, setTypeUtil] = useState("");
    const [mot_de_passe, setMotDePasse] = useState("");
    const [re_mot_de_passe, setReMotDePasse] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const fetchAllUsers = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/utilisateur`);
            setUtilisateur(res.data);

        } catch (error) {
            console.log(error);
        }
    }   

    function testMotDePasse(re) {
        if(re === mot_de_passe){
            return true;
        }else{
            return false;
        }
    }

    const clear = () => {
        setIdUtil("");
        setEmail("");
        setNomUtil("");
        setTypeUtil("");
        setMotDePasse("");
        setIsEdit(false);
        setIsOpen(false);
    }

    const typeString = (type) => {
        switch (type) {
            case 0:
                return "Admin"
            
            case 1:
                return "Normal"
        
            default:
                return ""
        }
    }

    async function addUtilisateur(e) {
        e.preventDefault();
        try {
            if (!testMotDePasse(re_mot_de_passe)) {
                alert("Mot de passe incorrect");
                return;
            }
            await axios.post(`${BASE_URL}/utilisateur`, {id_util, email, nom_util, type_util, mot_de_passe});
            alert("Un utilisateur a ete ajoute avec succes");
            clear();
            fetchAllUsers();
        } catch (error) {
            console.log(error);
        }   
    }

    async function deleteUtilisateur(e, id) {
        e.preventDefault();
        try {
            const confirmDelete = window.confirm("Voulez-vous reellement supprimer cet utilisateur ?");

            if (!confirmDelete) {
                return;
            }

            await axios.delete(`${BASE_URL}/utilisateur/${id}`);
            alert("Un utilisateur a ete supprime avec succes");

            fetchAllUsers();
        } catch (error) {
            console.log(error);
        }
    }

    async function editUtilisateur(e, id) {
        e.preventDefault();
        try {
            const confirmEdit = window.confirm("Voulez-vous reelement modifier cet utilisateur ?");
            
            if (!confirmEdit) {
                return;
            }
            
            await axios.put(`${BASE_URL}/utilisateur/${id}`, {id_util, email, nom_util, type_util, mot_de_passe});
            clear();

            alert("Un utilisateur a ete modifie avec succes");
            fetchAllUsers();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

  return <div>
    <h1 className="text-center text-2xl mb-5">Liste des utilisateurs</h1>
    <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">Nouveau</button>
    
    {<table className="w-full">
        <thead className="border bg-blue-500 py-2 text-white font-sans py-2">
            <tr>
                <td className="border py-2"></td>
                <th className="border py-2">NOM D'UTILISATEUR</th>
                <th className="border py-2">EMAIL</th>
                <th className="border py-2">TYPE</th>
                <th className="border py-2">MOT DE PASSE</th>
                <th className="border py-2">OPTIONS</th>
            </tr>
        </thead>
        <tbody>
            {utilisateurs.map((utilisateur) => {
                const {id_util, nom_util, email, type_util, mot_de_passe} = utilisateur;
                return <tr key={id_util}>
                    <td className="border py-1 px-2 text-right">{id_util}</td>
                    <td className="border py-1 px-2">{nom_util}</td>
                    <td className="border py-1 px-2">{email}</td>
                    <td className="border py-1 px-2">{typeString(type_util)}</td>
                    <td className="border py-1 px-2">{mot_de_passe}</td>
                    <td className="border py-1 px-2 text-center">{user?.type === 0 && (<div><button onClick={() => {setIsEdit(true); setIsOpen(true); setIdUtil(id_util); setNomUtil(nom_util); setEmail(email); setTypeUtil(type_util); setMotDePasse(mot_de_passe)}} className="bg-yellow-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-yellow-400">Modifier</button>  <button onClick={(e) => {deleteUtilisateur(e, id_util)}} className="bg-red-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-red-400">Supprimer</button></div>)} {user?.type === 1 && (<div className="font-semibold font-sans">Options indisponibles</div>)}</td>
                </tr>
            })}
        </tbody>
    </table>}

    {isOpen && (<div className="fixed bg-white border rounded-xl ring ring-black ring-opacity-20 top-28 left-1/3 w-1/3 p-4 font-sans">
        <h2 className="font-bold text-center text-xl mb-4">{isEdit ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h2>
        <form onSubmit={isEdit ? (e) => {editUtilisateur(e, id_util)} : addUtilisateur}>
            <div className="flex flex-col my-4 w-full">
                <label className="font-semibold">Nom d'utilisateur</label>
                <input type="text" name="nom_util" value={nom_util} onChange={(e) => setNomUtil(e.target.value)} className="py-1 px-2 outline-none border border-gray-300 rounded"/>
            </div>
            <div className="flex flex-col my-4 w-full">
                <label className="font-semibold">Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="py-1 px-2 outline-none border border-gray-300 rounded"/>
            </div>
            <div className="flex flex-col my-4 w-full">
                <label className="font-semibold">Type</label>
                <select name="type_util" value={type_util} onChange={(e) => setTypeUtil(e.target.value)} className="py-1 px-2 outline-none border border-gray-300 rounded">
                    <option value="">Type...</option>
                    <option value="0">Admin</option>
                    <option value="1">Normal</option>
                </select>
            </div>
            <div className="flex flex-col my-4 w-full">
                <label className="font-semibold">Nouveau mot de passe</label>
                <input type="password" name="mot_de_passe" value={mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} className="py-1 px-2 outline-none border border-gray-300 rounded"/>
            </div>
            <div className="flex flex-col my-4 w-full">
                <label className="font-semibold">Resaisir le mot de passe</label>
                <input type="password" name="re_mot_de_passe"  onChange={(e) => setReMotDePasse(e.target.value)} className="py-1 px-2 outline-none border border-gray-300 rounded"/>
            </div>
            <div className="w-full text-right mt-10">
                <button type="submit" className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">{isEdit ? "Modifier":"Ajouter"}</button>
                <button onClick={clear} className="bg-red-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-red-400">Fermer</button>
            </div>
        </form>
    </div>)}
    
  </div>
};

export default Utilisateur;