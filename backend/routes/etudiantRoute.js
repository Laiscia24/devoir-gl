const express = require("express");
const router = express.Router();

const {getAllEtudiants, getEtudiantByMatricule, getEtudiantByClasse, createEtudiant, deleteEtudiant, updateEtudiant} = require("../controllers/etudiantController");

router.route("/etudiant").get(getAllEtudiants);
router.route("/etudiant/:matricule").get(getEtudiantByMatricule);
router.route("/etudiant/:classe").get(getEtudiantByClasse);
router.route("/etudiant").post(createEtudiant);
router.route("/etudiant/:matricule").delete(deleteEtudiant);
router.route("/etudiant/:matricule").put(updateEtudiant);

module.exports = router;