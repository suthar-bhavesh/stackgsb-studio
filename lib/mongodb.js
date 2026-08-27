import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Local development ke liye
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
  });
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;

  console.log("MONGO_URL loaded:", Boolean(MONGO_URL));

  if (!MONGO_URL) {
    throw new Error("Please define MONGO_URL environment variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected");

    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.error("❌ MongoDB Connection Error:", error);

    throw error;
  }
};

export default connectDB;
