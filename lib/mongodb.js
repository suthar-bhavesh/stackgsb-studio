import mongoose from "mongoose";
import { promises } from "node:dns";
import { cache } from "react";

const MONGODB_URL = process.env.MONGO_URL;

if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URL is Environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export default async function dbConnection() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connection(MONGODB_URL)
      .then((mongooseInstance) => {
        console.log("DB Connected");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
