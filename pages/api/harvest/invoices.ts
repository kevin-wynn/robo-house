import nextConnect from "next-connect";
import { getHarvestInvoicesForClient } from "../../../helpers/HarvestHelper";
import auth from "../../../middleware/auth";
import db from "../../../middleware/db";

const handler = nextConnect();

handler
  .use(auth)
  .use(db)
  .get(async (req: any, res: any) => {
    const invoices = await getHarvestInvoicesForClient(
      req.session.passport.user.harvestID
    );
    res.status(200).send(invoices);
  });

export default handler;
