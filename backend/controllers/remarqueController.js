const db = require("../db/db");

function getAllRemarques(req, res) {
    const qr = "SELECT * FROM remarque";
    db.query(qr, (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function getOneRemarque(req,res) {
    const id = req.params.id_remarque;
    const qr = "SELECT * FROM remarque WHERE id_remarque=?";
    db.query(qr, [id], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function getRemarqueByEtudiant(req,res) {
    const matri = req.params.matricule;
    const qr = "SELECT * FROM remarque WHERE matricule=?";
    db.query(qr, [matri], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function getRemarqueByEtudiantType(req,res) {
    const par = [req.params.matricule, req.params.type];
    const qr = "SELECT COUNT(*) AS nombre FROM remarque WHERE matricule=? AND type=?";
    db.query(qr, [...par], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function createRemarque(req, res) {
    const qr = "INSERT INTO remarque(`id_remarque`, `matricule`, `date_remarque`, `type`, `description`) VALUES (?)";
    const values = [req.body.id_remarque, req.body.matricule, req.body.date_remarque, req.body.type, req.body.description];
    db.query(qr, [values], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Ajout avec succes !");
        }
    });
}

function deleteRemarque(req, res) {
    const id = req.params.id_remarque;
    const qr = "DELETE FROM remarque WHERE id_remarque=?";
    db.query(qr, [id], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Suppression avec succes !");
        }
    });
}

function updateRemarque(req, res) {
    const id = req.params.id_remarque;
    const qr = "UPDATE remarque SET `id_remarque`=?, `matricule`=?, `date_remarque`=?, `type`=?, `description`=? WHERE id_remarque=?";
    const values = [req.body.id_remarque, req.body.matricule, req.body.date_remarque, req.body.type, req.body.description];
    db.query(qr, [...values, id], (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json("Modification avec succes !");
        }
    });
}

module.exports = {getAllRemarques, getOneRemarque, getRemarqueByEtudiant, getRemarqueByEtudiantType, createRemarque, deleteRemarque, updateRemarque};