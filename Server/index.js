import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server/.env explicitly load karo
dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log("ENV PATH:", path.join(__dirname, ".env"));
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", Boolean(process.env.EMAIL_PASS));

// IMPORTANT:
// env load hone ke baad backend modules import karo
const { default: DbConnection } = await import("./DBConnection/DB.js");

const { default: enquiryRoutes } = await import("./Routes/UserRoutes.js");

const app = express();
const port = process.env.PORT || 8081;

DbConnection();

// =========================
// Middleware
// =========================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// =========================
// API Routes
// =========================

app.use("/api", enquiryRoutes);

app.get("/api/enquiries", (req, res) => {
  res.json({
    succeess: true,
    message: "StackGSB Studio API is running",
  });
});

// =========================
// React Frontend
// =========================

const ClientPath = path.join(__dirname, "../dist");

app.use(express.static(ClientPath));

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
