import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Classe = ({BASE_URL}) => {
    const {user} = useAuth();

    const [classes, setClasses] = useState([]);
    const [classe, setClasse] = useState("");
    const [niveau, setNiveau] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [cls, setCls] = useState("");
    
    const fetchAllClasses = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/classe`);
            setClasses(res.data);

        } catch (error) {
            console.log(error);
        }
    }   

    const clear = ()  => {
        setClasse("");
        setNiveau("");
        setIsEdit(false);
        setIsOpen(false);
    }

    async function addClasse(e){
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/classe`, {classe, niveau});
            alert("Une classe a ete ajoutee avec succes");
            clear();
            fetchAllClasses();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteClasse(e, cls) {
        e.preventDefault();
        try {
            const confirmDelete = window.confirm("Voulez-vous reellement supprimer cette classe ?");

            if (!confirmDelete) {
                return;
            }

            await axios.delete(`${BASE_URL}/classe/${cls}`);
            alert("Une classe a ete supprimee avec succes");
            fetchAllClasses();
        } catch (error) {
            console.log(error);
        }
    }

    async function editClasse(e, cls) {
        e.preventDefault();
        try {
            const confirmEdit = window.confirm("Voulez-vous reelement modifier cette classe ?");
            
            if (!confirmEdit) {
                return;
            }
            
            await axios.put(`${BASE_URL}/classe/${cls}`, {classe, niveau});
            clear();

            alert("Une classe a ete modifiee avec succes");
            fetchAllClasses();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllClasses();
    }, []);

  return <div>
    <h1 className="text-center text-2xl mb-5">Liste des classes</h1>
    <button onClick={() => {setIsOpen(true)}} className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">Nouveau</button>
    
    {<table className="w-full">
        <thead className="border bg-blue-500 py-2 text-white font-sans py-2">
            <tr>
                <th className="border py-2 w-1/4">CLASSE</th>
                <th className="border py-2 w-1/4">NIVEAU</th>
                <th className="border py-2">OPTIONS</th>
            </tr>
        </thead>
        <tbody>
            {classes.map((iclasse) => {
            const {classe, niveau} = iclasse;
            return <tr key={classe}>
                <td className="border py-1 px-2">{classe}</td>
                <td className="border py-1 px-2">{niveau}</td>
                <td className="border py-1 px-2 text-center">{user?.type === 0 && (<div><button onClick={() => {setIsEdit(true); setIsOpen(true); setClasse(classe); setNiveau(niveau); setCls(classe)}} className="bg-yellow-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-yellow-400">Modifier</button>  <button onClick={(e) => deleteClasse(e, classe)} className="bg-red-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-red-400">Supprimer</button></div>)} {user?.type === 1 && (<div className="font-semibold font-sans">Options indisponibles</div>)}</td>
            </tr>
            })}
        </tbody>
    </table>}

    {isOpen && (<div className="fixed bg-white border rounded-xl ring ring-black ring-opacity-20 top-28 left-1/3 w-1/3 p-4 font-sans">
        <h2 className="font-bold text-center text-xl mb-4">{isEdit ? "Modifier la classe" : "Ajouter une classe"}</h2>
        <form onSubmit={isEdit ? (e) => {editClasse(e, cls)} : addClasse}>
            <div className="flex flex-col my-4 w-full">
                <label className="font-semibold">Classe</label>
                <input type="text" name="classe" value={classe} onChange={(e) => setClasse(e.target.value)} className="py-1 px-2 outline-none border border-gray-300 rounded"/>
            </div>
            <div className="flex flex-col my-4 w-full">
                <label className="font-semibold">Niveau</label>
                <input type="text" name="niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)} className="py-1 px-2 outline-none border border-gray-300 rounded"/>
            </div>
            <div className="w-full text-right mt-10">
                <button type="submit" className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">{isEdit ? "Modifier" : "Ajouter"}</button>
                <button onClick={clear} className="bg-red-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-red-400">Fermer</button>
            </div>
        </form>
    </div>)}
  </div>
};

export default Classe;