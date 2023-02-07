import dbConnect from "../server/database";
import { ContactForm } from "../server/schemas/ContactForm";

export const getAllContactFormSubmissions = async () => {
  await dbConnect();
  return await ContactForm.find().lean();
};
