import Team from "../models/Team.js";

// Create new team
export const createTeam = async (req, res) => {
  try {
    const { name, description, adminId } = req.body;
    const team = await Team.create({ name, description, adminId });
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all teams
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("adminId", "name email");
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
