import type { NextApiRequest, NextApiResponse } from "next";
import { ContactForm } from "../../server/schemas/ContactForm";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const { email } = body;
    const existingForm = await ContactForm.findOne({ email }).exec();
    if (existingForm) {
      console.log(
        "This contact submission already exists for this email:",
        existingForm
      );
      res.status(202).json({
        message: "This contact submission already exists for this email",
      });
    } else {
      const contact = new ContactForm(body);
      try {
        const savedForm = await contact.save();
        res.status(201).json({ message: "Form submitted successfully" });
      } catch (e) {
        console.warn("Error saving ContactForm:", e);
        res
          .status(400)
          .json({ message: "Form not submitted because of an error" });
      }
    }
  }
}
