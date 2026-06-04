import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

dotenv.config();

import pool from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import detectionRoutes from "./routes/detectionRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();


// ======================
// MIDDLEWARE
// ======================

app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        /https:\/\/stroke-ai.*\.vercel\.app$/,  // ← ganti ini (nama baru)
        /http:\/\/localhost:\d+$/
      ];
      if (!origin || allowed.some(p => p.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);


app.use(express.json());

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);


// ======================
// STATIC FILES
// ======================

app.use("/uploads", express.static("uploads"));


// ======================
// ROUTES
// ======================

app.use("/api/auth", authRoutes);

app.use("/api/detections", detectionRoutes);


// ======================
// TEST SERVER
// ======================

app.get("/", (req, res) => {
  res.send("Stroke API Running 🚀");
});


// ======================
// TEST DATABASE
// ======================

app.get("/test-db", async (req, res) => {

  try {

    const result = await pool.query("SELECT NOW()");

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// ======================
// GLOBAL ERROR HANDLER
// ======================

app.use(errorHandler);


// ======================
// SERVER
// ======================

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
