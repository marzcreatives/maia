import mongoose from "mongoose";

const { Schema } = mongoose;

const emotionSchema = new Schema(
  {
    emotion_type: {
      type: String,
      required: true,
      enum: ["veryBad", "bad", "neutral", "good", "veryGood"], // Modify as necessary
    },
    emoji: {
      type: String,
      required: true,
    },
    severity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Emotion = mongoose.model("Emotion", emotionSchema);

export default Emotion;
