const express = require("express");
const router = express.Router();

const {getAllUtilisateurs, getOneUtilisateur, createUtilisateur, deleteUtilisateur, updateUtilisateur} = require("../controllers/utilisateurController");

router.route("/utilisateur").get(getAllUtilisateurs);
router.route("/utilisateur/:id_util").get(getOneUtilisateur);
router.route("/utilisateur").post(createUtilisateur);
router.route("/utilisateur/:id_util").delete(deleteUtilisateur);
router.route("/utilisateur/:id_util").put(updateUtilisateur);

module.exports = router;