const db = require("../db/db");

function getAllNotes(req, res) {
    const qr = "SELECT * FROM note";
    db.query(qr, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}
function getNoteByEtud(req, res) {
    const matri = req.params.matricule;
    const qr = "SELECT * FROM note WHERE matricule=?";
    db.query(qr, [matri], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
}

function getExamByEtud(req, res) {
    const matri = req.params.matricule;
    const qr = "SELECT examen FROM note WHERE matricule=?";
    db.query(qr, [matri], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
}

function getNoteByEtudExam(req, res) {
    const par = [req.params.matricule, req.params.examen];
    const qr = "SELECT * FROM note WHERE matricule=? AND examen=?";
    db.query(qr, [...par], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
}

function createNote(req, res) {
    const qr = "INSERT INTO note(`id_note`, `matricule`, `examen`, `note_math`, `note_pc`, `note_mlg`, `note_frs`, `note_ang`, `note_svt`, `note_hg`, `total_note`, `moyenne`) VALUES (?)";
    const values = [null, req.body.matricule, req.body.examen, req.body.note_math, req.body.note_pc, req.body.note_mlg, req.body.note_frs, req.body.note_ang, req.body.note_svt, req.body.note_hg, req.body.total_note, req.body.moyenne];
    db.query(qr, [values], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Ajout avec succes !");
        }
    });
}

function deleteNote(req, res) {
    const id = req.params.id_note;
    const qr = "DELETE FROM note WHERE id_note=?";
    db.query(qr, [id], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Suppression avec succes !");
        }
    });
}

function updateNote(req, res) {
    const id = req.params.id_note;
    const qr = "UPDATE note SET `id_note`=?, `matricule`=?, `examen`=?, `note_math`=?, `note_pc`=?, `note_mlg`=?, `note_frs`=?, `note_ang`=?, `note_svt`=?, `note_hg`=?, `total_note`=?, `moyenne`=? WHERE id_note=?";
    const values = [req.body.id_note, req.body.matricule, req.body.examen, req.body.note_math, req.body.note_pc, req.body.note_mlg, req.body.note_frs, req.body.note_ang, req.body.note_svt, req.body.note_hg, req.body.total_note, req.body.moyenne];
    db.query(qr, [...values, id], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Modification avec succes !");
        }
    });
}




//Rangs
function rangEtudByExam(req, res) {
    const par = [req.params.matricule, req.params.examen, req.params.classe];
    const qr = "SELECT COUNT(`total_note`) AS `rang` FROM note WHERE total_note >= (SELECT `total_note` FROM note WHERE matricule=?  AND examen=?) AND matricule IN (SELECT matricule FROM etudiant WHERE `classe`=?)";
    db.query(qr, [...par], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
}

function rangGeneEtud(params) {
    
}

module.exports = {getAllNotes, getNoteByEtud, getExamByEtud, getNoteByEtudExam, createNote, deleteNote, updateNote, rangEtudByExam, rangGeneEtud};