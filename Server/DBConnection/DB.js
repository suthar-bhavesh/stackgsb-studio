import mongoose from "mongoose";

async function DbConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (err) {
    console.error("Connection Error: ", err.message);
    process.exit(1);
  }
}

export default DbConnection;
