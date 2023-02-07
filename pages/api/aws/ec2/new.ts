import crypto from "crypto";
import nextConnect from "next-connect";
import auth from "../../../../middleware/auth";
import {
  EC2Client,
  RunInstancesCommand,
  DescribeInstancesCommand,
  AllocateAddressCommand,
  AssociateAddressCommand,
  DescribeAddressesCommand,
} from "@aws-sdk/client-ec2";
import { EC2Params } from "../../../../types/AWS";
import { getUserByCompanyName } from "../../../../helpers/UserHelper";
import { dashClientCompanyName } from "../../../../helpers/client/ClientHelper";
import { createWordpressEc2Params } from "../../../../helpers/client/AWSHelper";
import { createNewWordpressSite } from "../../../../helpers/client/WordpressHelper";
import { User } from "../../../../types/User";
import {
  createSSLForClient,
  createSubdomainForClient,
} from "../../../../helpers/client/CloudflareHelper";
import db from "../../../../middleware/db";

const handler = nextConnect();

// TODO: THIS CAN USE A LOT OF REFACTORING AND ABSTRACTING TO CLEAN IT UP
handler
  .use(auth)
  .use(db)
  .post(async (req: any, res: any) => {
    // set up the ec2 client
    const dashCompany = dashClientCompanyName(
      req.session.passport.user.company
    );
    const ec2Client = new EC2Client({ region: "us-east-2" });
    const currentUser = await getUserByCompanyName(
      req.session.passport.user.company
    );

    const DB_ROOT_PASS = crypto
      .createHash("sha256")
      .update(`rh_db_root_pass_${dashCompany}`)
      .digest("hex");
    const DB_WORDPRESS_PASS = crypto
      .createHash("sha256")
      .update(`rh_db_wp_pass_${dashCompany}`)
      .digest("hex");

    const ec2Params: EC2Params = createWordpressEc2Params(
      dashCompany,
      DB_ROOT_PASS,
      DB_WORDPRESS_PASS
    );

    ec2Params.UserData = Buffer.from(ec2Params.UserData, "utf8").toString(
      "base64"
    );

    const createInstanceCommand = new RunInstancesCommand(ec2Params);
    try {
      // create the instance
      ec2Client.send(createInstanceCommand);

      // try every 5 sceonds to allocate an ip, if the instance is pending still it wont set it
      const allocateIp = setInterval(async () => {
        console.log(
          "Starting interval check for creating and assigning Elastic IP"
        );
        const describeInstancesCommand = new DescribeInstancesCommand({
          Filters: [
            {
              Name: "instance-state-name",
              Values: ["running"],
            },
            {
              Name: "tag:client",
              Values: [dashCompany || ""],
            },
          ],
        });

        const instancesForThisClient = await ec2Client.send(
          describeInstancesCommand
        );

        const Reservations = instancesForThisClient.Reservations as any;

        if (Reservations && Reservations.length > 0) {
          const instance = Reservations[0].Instances[0];
          if (instance) {
            const paramsAllocateAddress = { Domain: "vpc" };

            const data = await ec2Client.send(
              new AllocateAddressCommand(paramsAllocateAddress)
            );

            const paramsAssociateAddress = {
              AllocationId: data.AllocationId,
              InstanceId: instance.InstanceId,
            };

            const results = await ec2Client.send(
              new AssociateAddressCommand(paramsAssociateAddress)
            );
            // todo: set up webhook that the startup instance can make a curl request to that will
            // update the wordpress entry to declare the instance is built and running
            console.log("Address associated:", results.AssociationId);
            console.log("Stopping interval");

            const updatedInstance = (await ec2Client.send(
              new DescribeInstancesCommand({
                InstanceIds: [instance.InstanceId],
              })
            )) as any;

            const ip =
              updatedInstance.Reservations[0].Instances[0].PublicIpAddress;

            console.log("Updating CF records to establish a subdomain");
            // update cloudflare dns records
            const cfDNSResponse = await createSubdomainForClient(
              dashCompany,
              ip
            );
            console.log("cf response:", cfDNSResponse);

            const cfSSLResponse = await createSSLForClient(dashCompany);

            console.log("Creating new Wordpress entry for user");
            // todo this should be an update to the users wordpress entry, and i should create a wordpress
            // entry whenever they click the button to start things and set its active to false, building to true
            await createNewWordpressSite({
              ip,
              subdomain: `https://${dashCompany}.robo-house.com`,
              dbRootPass: DB_ROOT_PASS,
              dbWordpressPass: DB_WORDPRESS_PASS,
              user: currentUser as User,
              active: true,
              building: false,
            });

            clearInterval(allocateIp);
          }
        }
      }, 5000);
    } catch (e) {
      console.error(e);
    }

    res.status(200).json({});
  });

export default handler;
