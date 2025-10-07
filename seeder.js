import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Team from "./src/models/Team.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const seed = async () => {
  try {
    // Pick an existing admin user
    const admin = await User.findOne({ role: "ADMIN" });
    if (!admin) {
      console.log("No admin found! Create one first.");
      process.exit();
    }

    // Create team
    const team = await Team.create({
      name: "Development Team",
      description: "Backend & Frontend Developers",
      adminId: admin._id,
    });

    console.log("Team created:", team);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

seed();
