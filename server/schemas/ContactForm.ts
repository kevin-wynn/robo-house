import mongoose from "mongoose";

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

export const ContactForm =
  mongoose.models.ContactForm ||
  mongoose.model("ContactForm", contactFormSchema);
