import nextConnect from "next-connect";
import { getAllContactFormSubmissions } from "../../helpers/ContactFormHelper";
import auth from "../../middleware/auth";
import db from "../../middleware/db";
import { ContactForm } from "../../server/schemas/ContactForm";

const handler = nextConnect();

handler
  .use(auth)
  .use(db)
  .get(async (req: any, res: any) => {
    const forms = await getAllContactFormSubmissions();
    res.json({ forms });
  })
  .post(async (req: any, res: any) => {
    const body = JSON.parse(req.body);
    const { email } = body;
    // move these functions to the helper file
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
  });

export default handler;
