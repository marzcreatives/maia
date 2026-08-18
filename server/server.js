import express from "express";
import connectDB from "./config/connection.js";
import cors from "cors";
import bodyParser from "body-parser";
import emotionRoutes from "./routes/emotionRoute.js";
import userRoutes from "./routes/userRoute.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

//initialize express app
const app = express();
const PORT = 3001;
// const PORT = process.env.PORT || 3001;

//connect to mongodb
connectDB();

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json()); // Parse JSON request bodies
app.use("/api/emotions", emotionRoutes);
app.use("/api/user-feelings", userRoutes);

//start server
const init = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to start server | ${error.message}`);
  }
};
//Initialize the app
init();
