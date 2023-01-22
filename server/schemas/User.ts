import mongoose from "mongoose";
import { db } from "../database";

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  company: String,
  type: String,
});

export const User = db.model("User", userSchema);
