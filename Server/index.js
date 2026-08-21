import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import DbConnection from "./DBConnection/DB.js";
import path from "path";
import { fileURLToPath } from "url";
import enquiryRoutes from "./Routes/UserRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8081;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

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

const ClientPath = path.join(_dirname, "../Client/dist");

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
