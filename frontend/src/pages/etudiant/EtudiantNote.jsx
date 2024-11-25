import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Note = ({BASE_URL, mat, setFiche}) => {
  const {user} = useAuth();

    const [matricule, setMatricule] = useState(mat);
    const [notes, setNotes] = useState([]);
    const [id_note, setIdNote] = useState("");
    const [examen, setExamen] = useState("");
    const [note_math, setNoteMath] = useState("");
    const [note_pc, setNotePc] = useState("");
    const [note_mlg, setNoteMlg] = useState("");
    const [note_frs, setNoteFrs] = useState("");
    const [note_ang, setNoteAng] = useState("");
    const [note_svt, setNoteSvt] = useState("");
    const [note_hg, setNoteHg] = useState("");
    const [total_note, setTotalNote] = useState("");
    const [moyenne, setMoyenne] = useState("");
    const [nOpen, setNOpen] = useState(false);
    const [nEdit, setNEdit] = useState(false);


    async function fetchStudentNotes(matri) {
        try {
            const res = await axios.get(`${BASE_URL}/note/${matri}`);
            setNotes(res.data);
            
        }catch (error) {
            console.log(error);
        }
    }
    
    const clear = () => {
      setIdNote("");
      setExamen("");
      setNoteMath("");
      setNotePc("");
      setNoteMlg("");
      setNoteFrs("");
      setNoteAng("");
      setNoteSvt("");
      setNoteHg("");
      setTotalNote("");
      setMoyenne("");
      setNOpen(false);
      setNEdit(false);
    }

    const somme = () => {
      if (!note_ang || !note_frs || !note_hg || !note_math || !note_mlg || !note_pc || !note_svt) {
        return 0;
      } else {
        const res = Number.parseFloat(note_ang) + Number.parseFloat(note_frs) + Number.parseFloat(note_hg) + Number.parseFloat(note_math) + Number.parseFloat(note_mlg) + Number.parseFloat(note_pc) + Number.parseFloat(note_svt);
        return res;
      }
    }

    const moy = () => {
      var res = somme() / 18;
      res = res.toFixed(2);
      return res;
    }

    async function addNote(e) {
      e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/note`, {id_note, matricule, examen, note_math, note_pc, note_mlg, note_frs, note_ang, note_svt, note_hg, total_note, moyenne});
            alert("Une serie de notes a ete ajoutee avec succes");
            clear();
            fetchStudentNotes(mat);
        } catch (error) {
            console.log(error);
        }
    }

    async function editNote(e, id) {
      e.preventDefault();
        try {
            const confirmEdit = window.confirm("Voulez-vous reelement modifier cette serie de notes ?");
            
            if (!confirmEdit) {
                return;
            }

            
            await axios.put(`${BASE_URL}/note/${id}`, {id_note, matricule, examen, note_math, note_pc, note_mlg, note_frs, note_ang, note_svt, note_hg, total_note, moyenne});
            clear();

            alert("Une serie de notes a ete modifiee avec succes");
            fetchStudentNotes(mat);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteNote(e, id) {
      e.preventDefault();
      try {
          const confirmDelete = window.confirm("Voulez-vous reellement supprimer cette serie de notes ?");

          if (!confirmDelete) {
              return;
          }

          await axios.delete(`${BASE_URL}/note/${id}`);
          alert("Une serie de notes a ete supprimee avec succes");
          fetchStudentNotes(mat);

      } catch (error) {
          console.log(error);
      }    
    }

    useEffect(() => {
        fetchStudentNotes(matricule);
    }, []);

    return <div>
        <button onClick={() => {setFiche(1)}} className="bg-gray-500 text-white font-sans py-1 px-4 rounded-md font-bold hover:bg-gray-400">RETOUR</button>
        <h1 className="text-center text-2xl font-bold mb-5">Notes de l'etudiant matricule n° {mat}</h1>
        <button onClick={() => {setNOpen(true)}} className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">Nouveau</button>
        
        <table className="w-full mx-2">
            <thead className="bg-blue-500 py-2 text-white font-sans">
              <tr>
                <th className="border py-1">EXAMEN</th>
                <th className="border py-1">MATH</th>
                <th className="border py-1">PC</th>
                <th className="border py-1">MLG</th>
                <th className="border py-1">FRS</th>
                <th className="border py-1">ANG</th>
                <th className="border py-1">SVT</th>
                <th className="border py-1">HG</th>
                <th className="border py-1">TOTAL</th>
                <th className="border py-1">MOYENNE</th>
                <th className="border py-1">OPTIONS</th>
              </tr>
            </thead>
            <tbody>
            {notes.map((note) => {
              const {id_note, examen, note_math, note_pc, note_mlg, note_frs, note_ang, note_svt, note_hg, total_note, moyenne} = note;
              return <tr key={id_note}>
                <td className="border py-1 px-2">{examen}</td>
                <td className="border py-1 px-2">{note_math}</td>
                <td className="border py-1 px-2">{note_pc}</td>
                <td className="border py-1 px-2">{note_mlg}</td>
                <td className="border py-1 px-2">{note_frs}</td>
                <td className="border py-1 px-2">{note_ang}</td>
                <td className="border py-1 px-2">{note_svt}</td>
                <td className="border py-1 px-2">{note_hg}</td>
                <td className="border py-1 px-2">{total_note}</td>
                <td className="border py-1 px-2">{moyenne}</td>
                <td className="border py-1 px-2 text-center">{user?.type === 0 && (<div><button onClick={() => {setNOpen(true); setNEdit(true); setIdNote(id_note); setExamen(examen); setNoteMath(note_math); setNotePc(note_pc); setNoteMlg(note_mlg); setNoteFrs(note_frs); setNoteAng(note_ang); setNoteSvt(note_svt); setNoteHg(note_hg); setTotalNote(total_note); setMoyenne(moyenne);}} className="bg-yellow-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-yellow-400">Modifier</button>  <button onClick={(e) => deleteNote(e, id_note)} className="bg-red-500 text-white font-sans py-1 px-2 mx-4 rounded-md font-bold hover:bg-red-400">Supprimer</button></div>)} {user?.type === 1 && (<div className="font-semibold font-sans">Options indisponibles</div>)}</td>

              </tr>
            })}
            </tbody>
          </table>
          
          {nOpen && (<div className="fixed bg-white border rounded-xl ring ring-black ring-opacity-20 top-20 left-56 w-2/3 p-4 font-sans">
            <h1 className="font-bold text-center text-xl mb-4">{nEdit ? "Motifier la serie de notes" : "Ajouter une serie de notes"}</h1>
            <form onSubmit={nEdit ? (e) => {editNote(e, id_note)} : addNote}>
              <div className="flex my-4 w-1/2">
                <label className="font-semibold">Examen</label>
                <select name="examen" value={examen} onChange={(e) => {setExamen(e.target.value)}} className="w-64 ml-2 py-1 px-2 outline-none border border-gray-300 rounded">
                  <option value="">Examen...</option>
                  <option value="Examen I">Examen I</option>
                  <option value="Examen II">Examen II</option>
                  <option value="Examen III">Examen III</option>
                  <option value="Examen IV">Examen IV</option>
                  <option value="Examen V">Examen V</option>
                  <option value="Examen VI">Examen VI</option>
                </select>
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Mathematique</label>
                    <input type="number" name="note_math" min={0} max={60} value={note_math} onChange={(e) => {setNoteMath(e.target.value)}} className="w-32 mr-2 ml-10 py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 60</span>
                  </div>
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Physique_Chimie</label>
                    <input type="number" name="note_pc" min={0} max={40} value={note_pc} onChange={(e) => {setNotePc(e.target.value)}} className="w-32 mr-2 ml-[25px] py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 40</span>
                  </div>
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Malagasy</label>
                    <input type="number" name="note_mlg" min={0} max={60} value={note_mlg} onChange={(e) => {setNoteMlg(e.target.value)}} className="w-32 mr-2 ml-[78px] py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 60</span>
                  </div>
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Francais</label>
                    <input type="number" name="note_frs" min={0} max={40} value={note_frs} onChange={(e) => {setNoteFrs(e.target.value)}} className="w-32 mr-2 ml-[88px] py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 40</span>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Anglais</label>
                    <input type="number" name="note_ang" min={0} max={40} value={note_ang} onChange={(e) => {setNoteAng(e.target.value)}} className="w-32 mr-2 ml-[174px] py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 40</span>
                  </div>
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Science de la Vie et de la Terre</label>
                    <input type="number" name="note_svt" min={0} max={60} value={note_svt} onChange={(e) => {setNoteSvt(e.target.value)}} className="w-32 mr-2 ml-2 py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 60</span>
                  </div>
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Histoire_Geographie</label>
                    <input type="number" name="note_hg" min={0} max={60} value={note_hg} onChange={(e) => {setNoteHg(e.target.value)}} className="w-32 mr-2 ml-20 py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 60</span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3">
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Total</label>
                    <input type="number" name="total_note" readOnly value={somme()} onClick={(e) => {setTotalNote(e.target.value)}} className="w-32 mr-2 ml-2 py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 360</span>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="flex my-4 w-full">
                    <label className="font-semibold">Moyenne</label>
                    <input type="number" name="moyenne" readOnly value={moy()} onClick={(e) => {setMoyenne(e.target.value)}} className="w-32 mr-2 ml-2 py-1 px-2 outline-none border border-gray-300 rounded"/>
                    <span> sur 20</span>
                  </div>
                </div>
              </div>
              <div className="w-full text-right mt-10">
                    <button type="submit" className="bg-green-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-green-400">{nEdit ? "Modifier" : "Ajouter"}</button>
                    <button onClick={clear} className="bg-red-500 text-white font-sans py-1 px-2 m-2 rounded-md font-bold hover:bg-red-400">Fermer</button>
              </div>
              
              
            </form>
          </div>)}


          
    </div>
}

export default Note;