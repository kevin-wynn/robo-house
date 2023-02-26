import Image from "next/image";
import { useEffect, useState } from "react";
import { AWS_ENUM } from "../../enum/AWS";
import {
  createEC2Instances,
  getEC2Instances,
} from "../../helpers/client/AWSHelper";
import { User } from "../../types/User";
import { Button } from "../Button";
import { Loader } from "../Loader";
import { Modal } from "../Modal";

const GetServerState = ({ serverStatus }: { serverStatus: any }) => {
  let status;
  switch (serverStatus[0].Instances[0].State.Code) {
    case AWS_ENUM.AWS_EC2_STATE_CODE_PENDING:
      status = "Pending";
      break;
    case AWS_ENUM.AWS_EC2_STATE_CODE_RUNNING:
      status = "Running";
      break;
    case AWS_ENUM.AWS_EC2_STATE_CODE_STOPPED:
      status = "Stopped";
      break;
    case AWS_ENUM.AWS_EC2_STATE_CODE_SHUTTING_DOWN:
      status = "Shutting Down";
      break;
    default:
      status = "Unavailable";
      break;
  }
  return <p>{status}</p>;
};

export const ServerStatus = ({
  wordpressSite,
  setWordpressSite,
  user,
}: {
  wordpressSite: any;
  setWordpressSite: any; //todo
  user: User;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [createInstanceType, setCreateInstanceType] = useState("wordpress");
  const [serverStatus, setServerStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getServerStatus = async () => {
      const { ec2Instances } = await getEC2Instances();
      setLoading(false);
      setServerStatus(ec2Instances);
    };
    getServerStatus();
  }, []);

  const createWordpressSite = async () => {
    setOpenModal(false);
    setWordpressSite({
      active: false,
      building: true,
    });
    const json = await createEC2Instances();
  };

  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="flex flex-col w-full justify-center items-center">
          {createInstanceType === "wordpress" ? (
            <div className="p-6 w-full flex items-center justify-center flex-col">
              <Image
                src="/images/logos/wordpress-with-aws.png"
                width="100"
                height="100"
                alt="Wordpress logo"
              />
              <p className="text-xl my-4">Create a Wordpress Site.</p>
              <p className="text-md">
                Confirming this will being the creation of a Wordpress site,
                when it has finished you will see the details of your new site
                in your client dashboard. You agree to incur a{" "}
                <span className="text-orange-500 font-bold">$25.00/mo</span>{" "}
                added hosting and maintenace charge to your project&apos;s
                invoice by creating a Wordpress site.
              </p>
              <div className="mt-12 w-full flex flex-col items-center justify-center">
                <Button
                  onClick={createWordpressSite}
                  type="button"
                  disabled={false}
                >
                  Create my Wordpress site.
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p>so you want to deploy a docker app do ya?</p>
            </div>
          )}
        </div>
      </Modal>
      <div className="w-full bg-white p-6 flex h-full flex-col justify-center items-center">
        {serverStatus.length > 0 ? (
          <div>
            <GetServerState serverStatus={serverStatus} />
          </div>
        ) : (
          <div className="flex flex-col">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="w-full mb-4 justify-center items-center flex">
                  <h2 className="font-bold text-xl">Server Status</h2>
                </div>
                <div className="flex flex-row justify-around w-full mb-4">
                  <Image
                    src="/images/logos/wordpress-with-aws.png"
                    width="50"
                    height="50"
                    alt="Wordpress logo"
                  />
                  <Image
                    src="/images/logos/docker-with-aws.png"
                    width="60"
                    height="50"
                    alt="Docker logo"
                  />
                </div>
                <span className="text-sm">You have no instances running.</span>
                <span className="text-sm">Get started by setting one up.</span>
                <div className="flex flex-row justify-around w-full mt-4">
                  <Button
                    disabled={false}
                    type="button"
                    onClick={() => {
                      setCreateInstanceType("wordpress");
                      setOpenModal(true);
                    }}
                  >
                    <span className="text-sm">Create Wordpress Site</span>
                  </Button>
                </div>
                <div className="flex flex-row justify-around w-full mt-4">
                  <Button
                    disabled={false}
                    type="button"
                    onClick={() => {
                      setOpenModal(true);
                      setCreateInstanceType("docker");
                    }}
                  >
                    <span className="text-sm">Create Docker Application</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
