import { ContactForm } from "../server/schemas/ContactForm";

export const getAllContactFormSubmissions = async () => {
  return await ContactForm.find();
};
