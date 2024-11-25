const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token === null){
        return res.sendStatus(401);
    }
    jwt.verify(token, JWT_SECRET, (err, utilisateur) => {
        if(err){
            return res.sendStatus(403);
        }
        req.utilisateur = utilisateur;
        next();
    })
}

module.exports = {authenticateToken};