import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Remarque = ({BASE_URL, mat, setFiche}) => {
    const {user} = useAuth();

    const [matricule, setMatricule] = useState(mat);
    const [remarques, setRemarques] = useState([]);
    const [id_remarque, setIdRemarque] = useState("");
    const [date_remarque, setDateRemarque] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [rOpen, setROpen] = useState(false);
    const [rEdit, setREdit] = useState(false);

    async function fetchStudentRemarques(matri) {
        try {
            const res = await axios.get(`${BASE_URL}/remarque/${matri}`);
            setRemarques(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    function formatDate(dateString) {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", options);
    }

    function formatDate2(dateString) {
        
        const date = new Date(dateString);
        const formatedDate = date.toISOString().split('T')[0];

        return formatedDate;
    }

    const clear = () => {
        setIdRemarque("");
        setDateRemarque("");
        setType("");
        setDescription("");
        setROpen(false);
        setREdit(false);
    }

    async function addRemarque(e) {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/remarque`, {id_remarque, matricule, date_remarque, type, description});
            alert("Une remarque a ete ajoutee avec succes");
            clear();
            fetchStudentRemarques(mat);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRemarque(e, id) {
        e.preventDefault();
        try {
            const confirmDelete = window.confirm("Voulez-vous reellement supprimer cette remarque ?");

            if (!confirmDelete) {
                return;
            }

            await axios.delete(`${BASE_URL}/remarque/${id}`);
            alert("Une remarque a ete supprimee avec succes");
            fetchStudentRemarques(mat);

        } catch (error) {
            console.log(error);
        }   
    }

    async function editRemarque(e, id) {
        e.preventDefault();
        try {
            const confirmEdit = window.confirm("Voulez-vous reelement modifier cette remarque ?");
            
            if (!confirmEdit) {
                return;
            }

            
            await axios.put(`${BASE_URL}/remarque/${id}`, {id_remarque, matricule, date_remarque, type, description});
            clear();

            alert("Une remarque a ete modifiee avec succes");
            fetchStudentRemarques(mat);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchStudentRemarques(mat);
    }, []);

    return <div>
        <button onClick={() => {setFiche(1)}} className="bg-gray-500 text-white font-sans py-1 px-4 rounded-md font-bold hover:bg-gray-400">RETOUR</button>
        <h1 className="text-center text-2xl font-bold mb-5">Remarques addressees a l'etudiant matricule n° {mat}</h1>
        <button onClick={() => setROpen(true)} className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">Nouveau</button>
        <table className="w-full mx-2">
            <thead className="bg-blue-500 py-2 text-white font-sans">
              <tr>
                <th className="border py-1">DATE</th>
                <th className="border py-1">TYPE</th>
                <th className="border py-1">DESCRIPTION</th>
                <th className="border py-1">OPTIONS</th>
              </tr>
            </thead>
            <tbody>
            {remarques.map((remarque) => {
              const {id_remarque, matricule, date_remarque, type, description} = remarque;
              return <tr key={id_remarque}>
                <td className="border py-1 px-2">{formatDate(date_remarque)}</td>
                <td className="border py-1 px-2">{type}</td>
                <td className="border py-1 px-2">{description}</td>
                <td className="border py-1 px-2 text-center">{user?.type === 0 && (<div><button onClick={() => {setROpen(true); setREdit(true); setIdRemarque(id_remarque); setMatricule(matricule); setDateRemarque(date_remarque); setType(type); setDescription(description)}} className="bg-yellow-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-yellow-400">Modifier</button>  <button onClick={(e) => {deleteRemarque(e, id_remarque)}} className="bg-red-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-red-400">Supprimer</button></div>)} {user?.type === 1 && (<div className="font-semibold font-sans">Options indisponibles</div>)}</td>
              </tr>
            })}
            </tbody>
          </table>

          {rOpen && (<div className="fixed bg-white border rounded-xl ring ring-black ring-opacity-20 top-28 left-1/3 w-1/3 p-4 font-sans">
            <h1 className="font-bold text-center text-xl mb-4">{rEdit ? "Motifier la remarque" : "Ajouter une remarque"}</h1>
            <form onSubmit={rEdit ? (e) => {editRemarque(e, id_remarque)} : addRemarque}>
                <div className="flex my-4 w-full">
                    <label className="font-semibold">Matricule</label>
                    <input type="text" name="matricule" value={matricule} readOnly className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"/>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold">Date</label>
                    <input type="date" name="date_remarque" value={date_remarque ? formatDate2(date_remarque) : ""} onChange={(e) => {setDateRemarque(e.target.value)}} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"/>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold">Type</label>
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5">
                        <option value="">Type...</option>
                        <option value="absence">Absence</option>
                        <option value="retard">Retard</option>
                        <option value="rmq_pos">Remarque positive</option>
                        <option value="rmq_neg">Remarque negative</option>
                    </select>
                </div>
                <div className="flex my-4 w-full">
                    <label className="font-semibold">Description</label>
                    <textarea name="description" cols="15" rows="2" value={description} onChange={(e) => setDescription(e.target.value)} className="w-64 py-1 px-2 outline-none border border-gray-300 rounded absolute right-5"></textarea>
                </div>
                <div className="w-full text-right mt-10">
                    <button type="submit" className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">{rEdit ? "Modifier" : "Ajouter"}</button>
                    <button onClick={clear} className="bg-red-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-red-400">Fermer</button>
                </div>
            </form>
          </div>)}
    </div>
}

export default Remarque;