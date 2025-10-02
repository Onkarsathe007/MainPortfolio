import mongoose from "mongoose";
import dotenv from "dotenv";

export default async function ConnectMongo() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      serverSelectionTimeoutMS: 30000,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Connected to MongoDB");
  } catch (e) {
    console.log(`Error·${e}·occcured`);
    throw e;
  }
}
