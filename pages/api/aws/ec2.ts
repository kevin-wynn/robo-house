import nextConnect from "next-connect";
import auth from "../../../middleware/auth";
import {
  EC2Client,
  DescribeInstancesCommand,
  Reservation,
} from "@aws-sdk/client-ec2";

const handler = nextConnect();

handler.use(auth).get(async (req: any, res: any) => {
  const ec2client = new EC2Client({ region: "us-east-2" });
  const ec2GetInstances = new DescribeInstancesCommand({});
  let ec2Instances: Reservation[] | undefined = [];

  try {
    const ec2InstancesResponse = await ec2client.send(ec2GetInstances);
    ec2Instances = ec2InstancesResponse.Reservations;
  } catch (e) {
    console.error(e);
  }

  res.status(200).json({ ec2Instances });
});

export default handler;
