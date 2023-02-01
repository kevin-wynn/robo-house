import nextConnect from "next-connect";
import auth from "../../../middleware/auth";
import db from "../../../middleware/db";

const handler = nextConnect();

// TODO: figure out if this is even necessary

handler
  .use(auth)
  .use(db)
  .get((req: any, res: any) => {
    res.status(200).send();
  });

export default handler;
