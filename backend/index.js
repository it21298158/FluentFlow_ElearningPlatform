import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import wordsRoute from './routes/wordsRoute.js';
import transcriptRoutes from "./routes/transcriptRoute.js";
import reminderRoutes from './routes/reminderRoutes.js';
import cookieParser from "cookie-parser";
import vocabRoutes from "./routes/vocab.route.js";
import bookRoutes from "./routes/BookRoutes.js"
import cors from "cors";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);
app.use("/backend/vocab", vocabRoutes);
//Heshan
//words
app.use('/words', wordsRoute);
//Chathura
//transcript
app.use('/transcript',transcriptRoutes);
//reminder
app.use('/api/reminders', reminderRoutes);

//Rashini
app.use('/books', bookRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
