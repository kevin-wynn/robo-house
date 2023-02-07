import nextConnect from "next-connect";
import { getAllUsersButAdmin } from "../../../helpers/UserHelper";
import auth from "../../../middleware/auth";
import db from "../../../middleware/db";

const handler = nextConnect();

handler
  .use(auth)
  .use(db)
  .get(async (req: any, res: any) => {
    const users = await getAllUsersButAdmin();
    res.status(200).json({ users });
  })
  .use((req: any, res: any, next: any) => {
    if (!req.user) {
      res.status(401).send("unauthenticated");
    } else {
      next();
    }
  });

export default handler;
