const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const firebaseAuth = require("../middleware/firebaseAuth");

router.post("/register", firebaseAuth, registerUser);
router.post("/login", firebaseAuth, loginUser);

module.exports = router;
