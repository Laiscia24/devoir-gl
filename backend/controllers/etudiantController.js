const db = require("../db/db");

function getAllEtudiants(req, res) {
    const qr = "SELECT * FROM etudiant";
    db.query(qr, (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function getEtudiantByMatricule(req,res) {
    const matri = req.params.matricule;
    const qr = "SELECT * FROM etudiant WHERE matricule=?";
    db.query(qr, [matri], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function getEtudiantByClasse(req,res) {
    const cls = req.params.classe;
    const qr = "SELECT * FROM etudiant WHERE classe=?";
    db.query(qr, [cls], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function createEtudiant(req, res) {
    const qr = "INSERT INTO etudiant(`matricule`, `nom_etud`, `prenom_etud`, `sexe`, `date_naiss`, `adresse`, `classe`, `numero`) VALUES (?)";
    const values = [req.body.matricule, req.body.nom_etud, req.body.prenom_etud, req.body.sexe, req.body.date_naiss, req.body.adresse, req.body.classe, req.body.numero];
    db.query(qr, [values], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Ajout avec succes !");
        }
    });
}

function deleteEtudiant(req, res) {
    const matri = req.params.matricule;
    const qr = "DELETE FROM etudiant WHERE matricule=?";
    db.query(qr, [matri], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Suppression avec succes !");
        }
    });
}

function updateEtudiant(req, res) {
    const matri = req.params.matricule;
    const qr = "UPDATE etudiant SET `matricule`=?, `nom_etud`=?, `prenom_etud`=?, `sexe`=?, `date_naiss`=?, `adresse`=?, `classe`=?, `numero`=? WHERE matricule=?";
    const values = [req.body.matricule, req.body.nom_etud, req.body.prenom_etud, req.body.sexe, req.body.date_naiss, req.body.adresse, req.body.classe, req.body.numero];
    db.query(qr, [...values, matri], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Modification avec succes !");
        }
    });
}

module.exports = {getAllEtudiants, getEtudiantByMatricule, getEtudiantByClasse, createEtudiant, deleteEtudiant, updateEtudiant};