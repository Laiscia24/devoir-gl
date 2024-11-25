const express = require("express");
const router = express.Router();

const {getAllRemarques, getOneRemarque, getRemarqueByEtudiant, getRemarqueByEtudiantType, createRemarque, deleteRemarque, updateRemarque} = require("../controllers/remarqueController");

router.route("/remarque").get(getAllRemarques);
router.route("/remarque/:matricule").get(getRemarqueByEtudiant);
router.route("/remarque/:matricule/:type").get(getRemarqueByEtudiantType);
router.route("/remarque").post(createRemarque);
router.route("/remarque/:id_remarque").delete(deleteRemarque);
router.route("/remarque/:id_remarque").put(updateRemarque);

module.exports = router;