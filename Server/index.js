import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// Environment Variables
// =========================

dotenv.config({
  path: path.join(__dirname, ".env"),
});

// Environment load hone ke baad backend modules import
const { default: DbConnection } = await import("./DBConnection/DB.js");

const { default: enquiryRoutes } = await import("./Routes/UserRoutes.js");

const app = express();
const port = process.env.PORT || 8081;

DbConnection();

// =========================
// CORS
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8081",
  "https://stackgsb-studio.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without Origin, e.g. Thunder Client
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },

    credentials: true,
  }),
);

// =========================
// JSON Middleware
// =========================

app.use(express.json());

// =========================
// API Routes
// =========================

app.use("/api", enquiryRoutes);

// API health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StackGSB Studio API is running",
  });
});

// =========================
// React Frontend
// =========================

const ClientPath = path.join(__dirname, "../dist");

app.use(express.static(ClientPath));

// React Router fallback
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.join(ClientPath, "index.html"));
  }

  next();
});

// =========================
// Server
// =========================

app.listen(port, "0.0.0.0", () => {
  console.log(`Server Started on port ${port}`);
});
