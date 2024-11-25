const express = require("express");
const router = express.Router();

const {getAllClasses, getOneClasse, createClasse, deleteClasse, updateClasse} = require("../controllers/classeController");

router.route("/classe").get(getAllClasses);
router.route("/classe/:classe").get(getOneClasse);
router.route("/classe").post(createClasse);
router.route("/classe/:classe").delete(deleteClasse);
router.route("/classe/:classe").put(updateClasse);

module.exports = router;