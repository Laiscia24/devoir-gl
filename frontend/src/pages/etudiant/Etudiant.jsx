import React, { useEffect, useState } from "react";
import axios from "axios";
import Fiche from "./EtudiantFiche";
import Note from "./EtudiantNote";
import Remarque from "./EtudiantRemarque";
import { useAuth } from "../../context/AuthContext";

const Etudiant = ({BASE_URL}) => {
    const {user} = useAuth();

    const [etudiants, setEtudiants] = useState([]);
    const [matricule, setMatricule] = useState("");
    const [nom_etud, setNomEtud] = useState("");
    const [prenoms_etud, setPrenomsEtud] = useState("");
    const [sexe, setSexe] = useState("");
    const [date_naiss, setDateNaiss] = useState("");
    const [adresse, setAdresse] = useState("");
    const [classe, setClasse] = useState("");
    const [numero, setNumero] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [classes, setClasses] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [matri, setMatri] = useState("");
    const [etud, setEtud] = useState(null);
    const [fiche, setFiche] = useState(0);
    
    const fetchAllStudents = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/etudiant`);
            setEtudiants(res.data);

        } catch (error) {
            console.log(error);
        }
    }   

    const fetchAllClasses = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/classe`);
            setClasses(res.data);

        } catch (error) {
            console.log(error);
        }
    }  


    const clear = () => {
        setMatricule("");
        setNomEtud("");
        setPrenomsEtud("");
        setSexe("");
        setDateNaiss("");
        setAdresse("");
        setClasse("");
        setNumero("");
        setIsEdit(false);
        setIsOpen(false);
    }

    function voirFiche(matri) {
        setMatricule(matri);
        setFiche(1);
    }

    async function addEtudiant(e) {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/etudiant`, {matricule, nom_etud, prenoms_etud, sexe, date_naiss, adresse, classe, numero});
            alert("Un etudiant a ete ajoute avec succes");
            clear();
            fetchAllStudents();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteEtudiant(e, matri) {
        e.preventDefault();
        try {
            const confirmDelete = window.confirm("Voulez-vous reellement supprimer cet etudiant ?");

            if (!confirmDelete) {
                return;
            }

            await axios.delete(`${BASE_URL}/etudiant/${matri}`);
            alert("Un etudiant a ete supprime avec succes");
            fetchAllStudents();

        } catch (error) {
            console.log(error);
        }   
    }

    async function editEtudiant(e, matri) {
        e.preventDefault();
        try {
            const confirmEdit = window.confirm("Voulez-vous reelement modifier cet etudiant ?");
            
            if (!confirmEdit) {
                return;
            }
            
            await axios.put(`${BASE_URL}/etudiant/${matri}`, {matricule, nom_etud, prenoms_etud, sexe, date_naiss, adresse, classe, numero});
            clear();

            alert("Un etudiant a ete modifie avec succes");
            fetchAllStudents();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllStudents();
        fetchAllClasses();
    }, []);

  return <div>
    {fiche === 0 && (<div>
        
        <h2 className="text-center text-2xl mb-5">Liste des etudiants</h2>
        <button onClick={() => {setIsOpen(true)}} className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">Nouveau</button>

        {<table className="w-full">
            <thead className="border bg-blue-500 py-2 text-white font-sans py-2">
                <tr>
                    <th className="border py-2">MATRICULE</th>
                    <th className="border py-2">NOM ET PRENOMS</th>
                    <th className="border py-2">FICHE</th>
                    <th className="border py-2">OPTIONS</th>
                </tr>
            </thead>
            <tbody>
            {etudiants.map((etudiant) => {
            const {matricule, nom_etud, prenoms_etud, sexe, date_naiss, adresse, classe, numero} = etudiant;
            return <tr key={matricule}>
                <td className="border py-1 px-2 text-right">{matricule}</td>
                <td className="border py-1 px-2">{nom_etud} {prenoms_etud}</td>
                <td className="border py-1 px-2 text-center"><button onClick={() => voirFiche(matricule)} className="bg-gray-500 text-white font-sans py-1 px-4 rounded-md font-bold hover:bg-gray-400">VOIR</button></td>
                <td className="border py-1 px-2 text-center">{user?.type === 0 && (<div><button onClick={() => {setIsOpen(true); setIsEdit(true); setMatricule(matricule); setNomEtud(nom_etud); setPrenomsEtud(prenoms_etud); setSexe(sexe); setDateNaiss(date_naiss); setAdresse(adresse); setClasse(classe); setNumero(numero); setMatri(matricule)}} className="bg-yellow-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-yellow-400">Modifier</button>  <button onClick={(e) => {deleteEtudiant(e, matricule)}} className="bg-red-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-red-400">Supprimer</button></div>)} {user?.type === 1 && (<div className="font-semibold font-sans">Options indisponibles</div>)}</td>
            </tr>
            })}
            </tbody>
        </table>}

        {isOpen && (<div className="fixed bg-white border rounded-xl ring ring-black ring-opacity-20 top-28 left-1/3 w-1/3 p-4 font-sans">
            <h1 className="font-bold text-center text-xl mb-4">{isEdit ? "Modifier l'etudiant" : "Ajouter un etudiant"}</h1>
            <form onSubmit={isEdit ? (e) => {editEtudiant(e, matri)} : addEtudiant}>
                <div className="flex my-4 w-full">
                    <label className="font-semibold">Matricule</label>
                    <input type="text" name="matricule" value={matricule} onChange={(e) => setMatricule(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"/>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold ">Nom</label>
                    <input type="text" name="nom_etud" value={nom_etud} onChange={(e) => setNomEtud(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"/>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold ">Prenoms</label>
                    <input type="text" name="prenoms_etud" value={prenoms_etud} onChange={(e) => setPrenomsEtud(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"/>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold ">Sexe</label>
                    <select name="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5">
                        <option value="">Sexe...</option>
                        <option value="F">Feminin</option>
                        <option value="M">Masculin</option>
                    </select>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold ">Date de naissance</label>
                    <input type="date" name="date_naiss" value={date_naiss} onChange={(e) => setDateNaiss(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"/>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold ">Adresse</label>
                    <input type="text" name="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"/>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold ">Classe</label>
                    <select name="classe" value={classe} onChange={(e) => setClasse(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5">
                        <option value="">Classe...</option>
                        {classes.map((iclasse) => {
                            const {classe, niveau} = iclasse;
                            return <option key={classe}>{classe}</option>
                        })}
                    </select>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold ">Numero</label>
                    <input type="number" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"/>
                </div>
                <div className="w-full text-right mt-10">
                    <button type="submit" className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">{isEdit ? "Modifier" : "Ajouter"}</button>
                    <button onClick={clear} className="bg-red-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-red-400">Fermer</button>
                </div>
            </form>
        </div>)}
    </div>)}
    
    {fiche === 1 && <div>
        <Fiche BASE_URL={BASE_URL} mat={matricule} setFiche={setFiche} />
    </div>}

    {fiche === 2 && <div>
        <Note BASE_URL={BASE_URL} mat={matricule} setFiche={setFiche} />     
    </div>}

    {fiche === 3 && <div>
        <Remarque BASE_URL={BASE_URL} mat={matricule} setFiche={setFiche} />     
    </div>}
    
    
  </div>
};

export default Etudiant;