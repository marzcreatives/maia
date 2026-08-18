import express from "express";
const router = express.Router();
import Emotion from "../models/emotion.js";

router.post("/send-emotion", async (req, res) => {
  const { emotion_type, emoji, severity } = req.body;

  try {
    // Create a new Emotion document and save it to the database
    const newEmotion = new Emotion({ emotion_type, emoji, severity });
    await newEmotion.save();
    res.status(200).json({ message: "Emotion saved successfully" });
  } catch (error) {
    console.error("[ERROR]: Failed to save emotion -", error.message);
    res
      .status(500)
      .json({ message: "Error saving emotion", error: error.message });
  }
});

// GET route to fetch all emotions
router.get("/", async (req, res) => {
  try {
    const emotions = await Emotion.find();
    res.status(200).json(emotions);
  } catch (error) {
    console.error("[ERROR]: Failed to fetch emotions -", error.message);
    res
      .status(500)
      .json({ message: "Error fetching emotions", error: error.message });
  }
});

export default router;
