import nextConnect from "next-connect";
import {
  createProjectForClient,
  getHarvestProjectsForClient,
} from "../../../helpers/HarvestHelper";
import auth from "../../../middleware/auth";
import db from "../../../middleware/db";

const handler = nextConnect();

handler
  .use(auth)
  .use(db)
  .get(async (req: any, res: any) => {
    const projects = await getHarvestProjectsForClient(
      req.session.passport.user.harvestID
    );
    res.status(200).send(projects);
  })
  .post(async (req: any, res: any) => {
    const projects = await createProjectForClient(
      req.session.passport.user.harvestID,
      req.body.name,
      req.body.startDate,
      req.body.endDate,
      req.body.budget
    );
    res.status(200).send(projects);
  });

export default handler;
