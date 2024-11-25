const express = require("express");
const router = express.Router();

const {getAllNotes, getNoteByEtud, getExamByEtud, getNoteByEtudExam, createNote, deleteNote, updateNote, rangEtudByExam, rangGeneEtud} = require("../controllers/noteController");

router.route("/note").get(getAllNotes);
router.route("/note/:matricule/:examen").get(getNoteByEtudExam);
router.route("/note/:matricule").get(getNoteByEtud);
router.route("/note/e/:matricule").get(getExamByEtud);
router.route("/note").post(createNote);
router.route("/note/:id_note").delete(deleteNote);
router.route("/note/:id_note").put(updateNote);
router.route("/note/:matricule/:examen/:classe").get(rangEtudByExam);

module.exports = router;