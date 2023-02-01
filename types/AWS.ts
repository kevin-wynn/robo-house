import { TagSpecification } from "@aws-sdk/client-ec2";

export type InstanceType = "t2.micro";
export type ImageType = "ami-05bfbece1ed5beb54";
export type KeyNameType = "kevin-root";

export type EC2Params = {
  ImageId: ImageType;
  InstanceType: InstanceType;
  KeyName: KeyNameType;
  MinCount: number;
  MaxCount: number;
  TagSpecifications: TagSpecification[];
  UserData: string;
  NetworkInterfaceId: string;
  SubnetId: string;
  SecurityGroupIds: string[];
};
