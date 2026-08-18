import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    feeling: {
      type: String,
      required: true,
      enum: ["veryBad", "bad", "neutral", "good", "veryGood"],
    },
    emotion: {
      type: [String],
      required: true,
    },
    reason: {
      type: [String],
      required: true,
    },
    extraNotes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
