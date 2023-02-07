import nextConnect from "next-connect";
import passport from "passport";
import auth from "../../middleware/auth";

const handler = nextConnect();

handler.use(auth).post(passport.authenticate("local"), (req: any, res: any) => {
  res
    .status(200)
    .send({
      success: true,
      message: "Login successful",
      user: req.session.passport.user,
    });
});

export default handler;
