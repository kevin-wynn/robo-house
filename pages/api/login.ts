import nextConnect from "next-connect";
import passport from "passport";
import auth from "../../middleware/auth";

const handler = nextConnect();

handler.use(auth).post(passport.authenticate("local"), (req: any, res: any) => {
  res.status(200).send();
});

export default handler;
