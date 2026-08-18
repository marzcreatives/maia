import User from "../models/user.js";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { feeling, emotion, reason, extraNotes } = req.body;

  try {
    const newUserFeeling = new User({
      feeling,
      emotion,
      reason,
      extraNotes,
    });
    await newUserFeeling.save();
    res.status(201).json({
      message: "User feeling saved successfully",
      data: newUserFeeling,
    });
  } catch (error) {
    console.error("[ERROR]: Failed to save user feeling -", error.message);
    res
      .status(500)
      .json({ message: "Error saving user feeling", error: error.message });
  }
});
// GET route to fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    console.error("[ERROR]: Failed to fetch users -", error.message);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});
// GET route to fetch users for a specific date
router.get("/by-date", async (req, res) => {
  const { date } = req.query;
  try {
    // Validate the presence of the date
    if (!date) {
      return res
        .status(400)
        .json({ message: "Please provide a date in YYYY-MM-DD format" });
    }

    // Parse the date and define the start and end of the day
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day

    // Find documents with createdAt between startOfDay and endOfDay
    const users = await User.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    console.error("[ERROR]: Failed to fetch users by date -", error.message);
    res
      .status(500)
      .json({ message: "Error fetching users by date", error: error.message });
  }
});
// GET route to fetch a specific user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("[ERROR]: Failed to fetch user data -", error.message);
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ message: "Invalid user ID format", error: error.message });
    }
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error("[ERROR]: Failed to delete user -", error.message);
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

export default router;
