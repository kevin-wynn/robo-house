import nextConnect from "next-connect";
import dbConnect from "../server/database";

const db = nextConnect().use(async (req: any, res: any, next: any) => {
  await dbConnect();
  next();
});

export default db;
