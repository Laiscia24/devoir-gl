const db = require("../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function login(req, res) {
    const {email, mot_de_passe} = req.body;
    const qr = "SELECT * FROM utilisateur WHERE email=? AND mot_de_passe=?";
    db.query(qr, [email, mot_de_passe], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({message: "erreur dans la requete"})
        }
        if(result.length > 0){
            const utilisateur = result[0];
            const token = jwt.sign({
                id: utilisateur.id_util,
                email: utilisateur.email,
                nom: utilisateur.nom_util,
                type: utilisateur.type_util
            }, JWT_SECRET, {expiresIn: "24h"});
            res.json({token});
        }else{
            res.status(401).json({message: "Credential invalide"});
        }
    })
}

function getConnectedUser(req, res) {
    res.json(req.utilisateur);
}

module.exports = {login, getConnectedUser};