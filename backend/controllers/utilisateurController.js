const db = require("../db/db");

function getAllUtilisateurs(req, res) {
    const qr = "SELECT * FROM utilisateur";
    db.query(qr, (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function getOneUtilisateur(req,res) {
    const id = req.params.id_util;
    const qr = "SELECT * FROM utilisateur WHERE id_util=?";
    db.query(qr, [id], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function createUtilisateur(req, res) {
    const qr = "INSERT INTO utilisateur(`id_util`, `email`, `nom_util`, `type_util`, `mot_de_passe`) VALUES (?)";
    const values = [null, req.body.email, req.body.nom_util, req.body.type_util, req.body.mot_de_passe];
    db.query(qr, [values], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Ajout avec succes !");
        }
    });
}

function deleteUtilisateur(req, res) {
    const id = req.params.id_util;
    const qr = "DELETE FROM utilisateur WHERE id_util=?";
    db.query(qr, [id], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Suppression avec succes !");
        }
    });
}

function updateUtilisateur(req, res) {
    const id = req.params.id_util;
    const qr = "UPDATE utilisateur SET `id_util`=?, `email`=?, `nom_util`=?, `type_util`=?, `mot_de_passe`=? WHERE id_util=?";
    const values = [req.body.id_util, req.body.email, req.body.nom_util, req.body.type_util, req.body.mot_de_passe];
    db.query(qr, [...values, id], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Modification avec succes !");
        }
    });
}

module.exports = {getAllUtilisateurs, getOneUtilisateur, createUtilisateur, deleteUtilisateur, updateUtilisateur};