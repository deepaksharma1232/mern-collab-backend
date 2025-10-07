const express = require("express");
const { createTeam, getTeams } = require("../controllers/teamController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Only ADMIN can create teams
router.post("/", verifyToken, authorizeRoles("ADMIN"), createTeam);

// Any authenticated user can view teams
router.get("/", verifyToken, getTeams);

module.exports = router;
