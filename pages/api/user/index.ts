import nextConnect from "next-connect";
import { createHarvestClient } from "../../../helpers/HarvestHelper";
import {
  createUser,
  getUserByUsername,
  updateUserById,
} from "../../../helpers/UserHelper";
import auth from "../../../middleware/auth";
import db from "../../../middleware/db";

const handler = nextConnect();

handler
  .use(auth)
  .use(db)
  .get((req: any, res: any) => {
    res.json({ user: req.user });
  })
  .post(async (req: any, res: any) => {
    // create a user from admin flow
    const user = await createUser(req.body);
    res
      .status(200)
      .json({ success: true, message: "User Created successfully" });
  })
  .put(async (req: any, res: any) => {
    // create user from signup flow
    if (!req.body.code) {
      res
        .status(403)
        .json({ success: false, message: "No client code provided" });
    }

    const foundUser = await getUserByUsername(req.body.email);
    if (!foundUser) {
      res.status(404).json({ success: false, message: "User email not found" });
    }

    try {
      const response = await createHarvestClient(
        req.body.company,
        req.body.address
      );
      await updateUserById(foundUser._id, {
        ...req.body,
        harvestID: response.id,
      });
      res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    } catch (e) {
      res
        .status(500)
        .json({ success: false, message: "Server error, please try again" });
    }
  })
  .use((req: any, res: any, next: any) => {
    if (!req.user) {
      res.status(401).send("unauthenticated");
    } else {
      next();
    }
  });

export default handler;
