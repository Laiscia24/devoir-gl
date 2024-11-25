import React, { useEffect, useState } from "react";
import axios from "axios";
import Etudiant from "../etudiant/Etudiant";


const Fiche = ({BASE_URL, mat}) => {
  const [etudiants, setEtudiants] = useState([]);
  const [matricule, setMatricule] = useState(mat);
  const [nom_etud, setNomEtud] = useState("");
  const [prenom_etud, setPrenomEtud] = useState("");
  const [sexe, setSexe] = useState("");
  const [date_naiss, setDateNaiss] = useState("");
  const [adresse, setAdresse] = useState("");
  const [classe, setClasse] = useState("");
  const [numero, setNumero] = useState("");

  const [notes, setNotes] = useState([]);
  const [moyennes, setMoyennes] = useState([]);

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

  async function displayEtudiant() {
    try {

      fetchStudentDatas(matricule);
      fetchStudentNotes(matricule);
      const etd = etudiants[0];
      setMatricule(etd?.matricule);
      setNomEtud(etd?.nom_etud);
      setPrenomEtud(etd?.prenom_etud);
      setSexe(etd?.sexe);
      setDateNaiss(etd?.date_naiss);
      setAdresse(etd?.adresse);
      setClasse(etd?.classe);
      setNumero(etd?.numero);

    }catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    displayEtudiant();
  }, []);

    
  return <div>
  {etudiants.map((etudiant)=>{
    const {matricule, nom_etud, prenom_etud, sexe, date_naiss, adresse, classe, numero} = etudiant;
    return <div key={matricule}>

      <h1 className="text-center text-2xl font-bold">Fiche de l'etudiant Matricule n° {matricule}</h1>
      <div className="border mt-4 p-2 rounded-xl">
        <h2 className="-mt-5 ml-5 mb-5 px-2 w-fit text-lg text-gray-500 font-sans font-semibold bg-white">Details de l'etudiant</h2>
        <p className="text-sm"><b>Matricule :</b> {matricule}</p>
        <p className="text-sm"><b>Nom :</b> {nom_etud}</p>
        <p className="text-sm"><b>Prenoms :</b> {prenom_etud}</p>
        <p className="text-sm"><b>Sexe :</b> {sexe}</p>
        <p className="text-sm"><b>Date de naissance :</b> {date_naiss}</p>
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
                <td className="border py-1 px-2"></td>
              </tr>
            })}
            </tbody>
          </table>
          <p className="text-sm"><b>Moyenne generale :</b> {(plus/ex).toFixed(2)}</p>
          <p className="text-sm"><b>Rang final :</b> (rang) sur (nombre)</p>
          <div className="text-right">
            <button className="bg-gray-500 text-white font-sans py-1 px-4 rounded-md font-bold hover:bg-gray-400">Details</button>
          </div>
        </div>
        <div className="border w-1/2 h-full mt-4 ml-1 p-2 rounded-xl">
          <h2 className="-mt-5 ml-5 mb-5 px-2 w-fit text-lg text-gray-500 font-sans font-semibold bg-white">Remarques</h2>
          <p className="text-sm my-2"><b>Nombre d'absences :</b> (nombre)</p>
          <p className="text-sm my-2"><b>Nombre de retards :</b> (nombre)</p>
          <p className="text-sm my-2"><b>Nombre de remarques positives :</b> (nombre)</p>
          <p className="text-sm my-2"><b>Nombre de remarques negatives :</b> (nombre)</p>
          <div className="text-right">
            <button className="bg-gray-500 text-white font-sans py-1 px-4 rounded-md font-bold hover:bg-gray-400">Details</button>
          </div>
        </div>
      </div>
    </div>
  })}


  </div>
};

export default Fiche;