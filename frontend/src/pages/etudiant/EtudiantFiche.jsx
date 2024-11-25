import React, { useEffect, useState } from "react";
import axios from "axios";
import Etudiant from "./Etudiant";


const Fiche = ({BASE_URL, mat, setFiche}) => {
  
  const [etudiants, setEtudiants] = useState([]);
  const [matricule, setMatricule] = useState(mat);

  const [notes, setNotes] = useState([]);
  const [remarques, setRemarques] = useState([]);

  const [nbAbs, setNbAbs] = useState(0);
  const [nbRet, setNbRet] = useState(0);
  const [nbRmqPos, setNbRmqPos] = useState(0);
  const [nbRmqNeg, setNbRmqNeg] = useState(0);


  var plus = 0;
  var ex = 0;

  async function fetchStudentDatas(matri) {
    try {
      const res = await axios.get(`${BASE_URL}/etudiant/${matri}`);
      setEtudiants(res.data);

    }catch (error) {
      console.log(error);
    }
  }

  async function fetchStudentNotes(matri) {
    try {
      const res = await axios.get(`${BASE_URL}/note/${matri}`);
      setNotes(res.data);
      
    }catch (error) {
      console.log(error);
    }
  }

  async function fetchStudentRemarques(matri) {
    try {
        const res = await axios.get(`${BASE_URL}/remarque/${matri}`);
        setRemarques(res.data);
    } catch (error) {
        console.log(error);
    }
  }
  
  const nbAbsparEtd = async (matri) => {
    try {
        const res = await axios.get(`${BASE_URL}/remarque/${matri}/absence`);
        setNbAbs(res.data[0].nombre);
        
    } catch (error) {
        console.log(error);
    }
  }

  const nbRetparEtd = async (matri) => {
    try {
        const res = await axios.get(`${BASE_URL}/remarque/${matri}/retard`);
        setNbRet(res.data[0].nombre);
        
    } catch (error) {
        console.log(error);
    }
  }

  const nbRmqPosparEtd = async (matri) => {
    try {
        const res = await axios.get(`${BASE_URL}/remarque/${matri}/rmq_pos`);
        setNbRmqPos(res.data[0].nombre);
        
    } catch (error) {
        console.log(error);
    }
  }
  
  const nbRmqNegparEtd = async (matri) => {
    try {
        const res = await axios.get(`${BASE_URL}/remarque/${matri}/rmq_neg`);
        setNbRmqNeg(res.data[0].nombre);
        
    } catch (error) {
        console.log(error);
    }
  }

  function nbRmqParType(matri) {
    nbAbsparEtd(matri);
    nbRetparEtd(matri);
    nbRmqPosparEtd(matri);
    nbRmqNegparEtd(matri);
  }

  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  }
  
  

  async function displayEtudiant() {
    try {

      fetchStudentDatas(matricule);
      fetchStudentNotes(matricule);
      nbRmqParType(matricule);
      
    }catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    displayEtudiant();
  }, []);

    
  return <div>
    <button onClick={() => {setFiche(0)}} className="bg-gray-500 text-white font-sans py-1 px-4 rounded-md font-bold hover:bg-gray-400">RETOUR</button>
  {etudiants.map((etudiant)=>{
    const {matricule, nom_etud, prenoms_etud, sexe, date_naiss, adresse, classe, numero} = etudiant;
    return <div key={matricule}>

      <h1 className="text-center text-2xl font-bold">Fiche de l'etudiant Matricule n° {matricule}</h1>
      <div className="border mt-4 p-2 rounded-xl">
        <h2 className="-mt-5 ml-5 mb-5 px-2 w-fit text-lg text-gray-500 font-sans font-semibold bg-white">Details de l'etudiant</h2>
        <p className="text-sm"><b>Matricule :</b> {matricule}</p>
        <p className="text-sm"><b>Nom :</b> {nom_etud}</p>
        <p className="text-sm"><b>Prenoms :</b> {prenoms_etud}</p>
        <p className="text-sm"><b>Sexe :</b> {sexe}</p>
        <p className="text-sm"><b>Date de naissance :</b> {formatDate(date_naiss)}</p>
        <p className="text-sm"><b>Adresse :</b> {adresse}</p>
        <p className="text-sm"><b>Classe :</b> {classe}</p>
        <p className="text-sm"><b>Numero :</b> {numero}</p>
      </div>
      <div className="flex">
        <div className="border w-1/2 h-full mt-4 mr-1 p-2 rounded-xl">
          <h2 className="-mt-5 ml-5 px-2 w-fit text-lg text-gray-500 font-sans font-semibold bg-white">Notes</h2>
          <table className="w-2/3 mb-5">
            <thead className="bg-blue-500 py-2 text-white font-sans">
              <tr>
                <th className="border py-1">EXAMEN</th>
                <th className="border py-1">MOYENNE</th>
                <th className="border py-1">RANG</th>
              </tr>
            </thead>
            <tbody>
            {notes.map((note) => {
              const {id_note, examen, moyenne} = note;
              plus += moyenne;
              ex += 1;
              return <tr key={id_note}>
                <td className="border py-1 px-2">{examen}</td>
                <td className="border py-1 px-2">{moyenne}</td>
                <td className="border py-1 px-2">{}</td>
              </tr>
            })}
            </tbody>
          </table>
          <p className="text-sm"><b>Moyenne generale :</b> {(plus/ex).toFixed(2)}</p>
          <p className="text-sm"><b>Rang final :</b> (rang) sur (nombre)</p>
          <div className="text-right">
            <button onClick={() => {setFiche(2)}} className="bg-gray-500 text-white font-sans py-1 px-4 rounded-md font-bold hover:bg-gray-400">Details</button>
          </div>
        </div>
        <div className="border w-1/2 h-full mt-4 ml-1 p-2 rounded-xl">
          <h2 className="-mt-5 ml-5 mb-5 px-2 w-fit text-lg text-gray-500 font-sans font-semibold bg-white">Remarques</h2>
          <p className="text-sm my-2"><b>Nombre d'absences : </b> {nbAbs} </p>
          <p className="text-sm my-2"><b>Nombre de retards :</b> {nbRet}</p>
          <p className="text-sm my-2"><b>Nombre de remarques positives :</b> {nbRmqPos}</p>
          <p className="text-sm my-2"><b>Nombre de remarques negatives :</b> {nbRmqNeg}</p>
          <div className="text-right">
            <button onClick={() => {setFiche(3)}} className="bg-gray-500 text-white font-sans py-1 px-4 rounded-md font-bold hover:bg-gray-400">Details</button>
          </div>
        </div>
      </div>
    </div>
  })}


  </div>
};

export default Fiche;