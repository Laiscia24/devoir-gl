const express = require("express");
const router = express.Router();
const {authenticateToken} = require("../middleware/middleware");

const {login, getConnectedUser} = require("../controllers/authController");

router.route("/login").post(login);
router.route("/connectedUser").get(authenticateToken, getConnectedUser);

module.exports = router;