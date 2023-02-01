import nextConnect from "next-connect";
import { getHarvestTimeSheetForProject } from "../../../helpers/HarvestHelper";
import auth from "../../../middleware/auth";
import db from "../../../middleware/db";

const handler = nextConnect();

handler
  .use(auth)
  .use(db)
  .get(async (req: any, res: any) => {
    const timesheets = await getHarvestTimeSheetForProject(req.query.projectId);
    res.status(200).send(timesheets);
  });

export default handler;
