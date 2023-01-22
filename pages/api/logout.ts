import nextConnect from "next-connect";
import auth from "../../middleware/auth";

const handler = nextConnect();

handler.use(auth).get((req: any, res: any) => {
  req.logout();
  res.status(200).send();
});

export default handler;
