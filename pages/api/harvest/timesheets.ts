import nextConnect from "next-connect";
import {
  getHarvestTimeSheetsForClient,
  getHarvestTimeSheetsForProject,
} from "../../../helpers/HarvestHelper";
import auth from "../../../middleware/auth";
import db from "../../../middleware/db";

const handler = nextConnect();

handler
  .use(auth)
  .use(db)
  .get(async (req: any, res: any) => {
    let timesheets = [];
    if (req.query && req.query.projectId) {
      timesheets = await getHarvestTimeSheetsForProject(req.query.projectId);
    } else {
      timesheets = await getHarvestTimeSheetsForClient(
        req.session.passport.user.harvestID
      );
    }
    res.status(200).send(timesheets);
  });

export default handler;
