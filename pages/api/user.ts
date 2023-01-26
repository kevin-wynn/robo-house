import nextConnect from "next-connect";
import { createHarvestClient } from "../../helpers/HarvestHelper";
import { createUser } from "../../helpers/UserHelper";
import auth from "../../middleware/auth";

const handler = nextConnect();

handler
  .use(auth)
  .get((req: any, res: any) => {
    let cleanUser = null;
    if (req.user) {
      cleanUser = req.user;
      delete cleanUser.password;
    }

    res.json({ user: cleanUser });
  })
  .post(async (req: any, res: any) => {
    const response = await createHarvestClient(
      req.body.company,
      req.body.address
    );
    const newUser = { ...req.body, harvestID: response.id };
    console.log("newUser:", newUser);
    await createUser({ ...req.body, harvestID: response.id });
    res.status(200).json({ success: true, message: "created new user" });
  })
  .use((req: any, res: any, next: any) => {
    if (!req.user) {
      res.status(401).send("unauthenticated");
    } else {
      next();
    }
  });
//   .put((req: any, res: any) => {
//     const { name } = req.body;
//     const user = updateUserByUsername(req, req.user.username, { name });
//     res.json({ user });
//   })
//   .delete((req, res) => {
//     deleteUser(req);
//     req.logOut();
//     res.status(204).end();
//   });

export default handler;
