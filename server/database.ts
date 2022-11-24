import mongoose from "mongoose";

export const db = mongoose.createConnection(process.env.MONGODB_URI!);
