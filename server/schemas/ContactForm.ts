import mongoose from "mongoose";
import { db } from "../database";

const contactFormSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const ContactForm = db.model("ContactForm", contactFormSchema);
