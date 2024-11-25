const db = require("../db/db");

function getAllClasses(req, res) {
    const qr = "SELECT * FROM classe";
    db.query(qr, (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}

function getOneClasse(req, res) {
    const cls = req.params.classe;
    const qr = "SELECT * FROM classe WHERE classe=?";
    db.query(qr, [cls], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}

function createClasse(req, res) {
    const qr = "INSERT INTO classe(`classe`, `niveau`) VALUES (?)";
    const values = [req.body.classe, req.body.niveau];
    db.query(qr, [values], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Ajout avec succes !");
        }
    });
}

function deleteClasse(req, res) {
    const cls = req.params.classe;
    const qr = "DELETE FROM classe WHERE classe=?";
    db.query(qr, [cls], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Suppression avec succes !");
        }
    });
}

function updateClasse(req, res) {
    const cls = req.params.classe;
    const qr = "UPDATE classe SET `classe`=?, `niveau`=? WHERE classe=?";
    const values = [req.body.classe, req.body.niveau];
    db.query(qr, [...values, cls], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Modification avec succes !");
        }
    });
}

module.exports = {getAllClasses, getOneClasse, createClasse, deleteClasse, updateClasse};