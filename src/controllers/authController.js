const admin = require("firebase-admin");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Firebase user already authenticated
    const firebaseUser = req.firebaseUser;
    if (!firebaseUser) return res.status(401).json({ error: "Unauthorized" });

    const existingUser = await User.findOne({ uid: firebaseUser.uid });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      uid: firebaseUser.uid,
      name,
      email,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const firebaseUser = req.firebaseUser;
    if (!firebaseUser) return res.status(401).json({ error: "Unauthorized" });

    let user = await User.findOne({ uid: firebaseUser.uid });
    if (!user) {
      user = await User.create({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.name?.split(" ")[0] || "",
        role: "MEMBER",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
