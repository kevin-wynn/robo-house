import Image from "next/image";
import { useEffect, useState } from "react";
import { GetEC2Instances } from "../../helpers/client/AWSHelper";
import { Modal } from "../Modal";

export const ServerStatus = () => {
  const [openModal, setOpenModal] = useState(false);
  const [createInstanceType, setCreateInstanceType] = useState("wordpress");
  const [serverStatus, setServerStatus] = useState([]);
  useEffect(() => {
    const getServerStatus = async () => {
      const json = await GetEC2Instances();
      console.log("json:", json);
      setServerStatus(json);
    };
    getServerStatus();
  }, []);
  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="flex flex-col w-full">
          {createInstanceType === "wordpress" ? (
            <div>
              <p>so you want to deploy a wordpress site do ya?</p>
            </div>
          ) : (
            <div>
              <p>so you want to deploy a docker app do ya?</p>
            </div>
          )}
        </div>
      </Modal>
      <div className="w-full bg-white p-4 flex flex-col justify-center items-center h-64">
        {serverStatus.length > 0 ? (
          <div>
            <p>okay</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm">You have no instances running.</span>
            <span className="text-sm">Get started by setting one up.</span>
            <div className="flex flex-row justify-around w-full mt-4">
              <button
                className="outline-none"
                type="button"
                onClick={() => {
                  setCreateInstanceType("wordpress");
                  setOpenModal(true);
                }}
              >
                <Image
                  src="/images/logos/wordpress-with-aws.png"
                  width="65"
                  height="65"
                  alt="Wordpress logo"
                />
              </button>
              <button
                className="outline-none"
                type="button"
                onClick={() => {
                  setOpenModal(true);
                  setCreateInstanceType("docker");
                }}
              >
                <Image
                  src="/images/logos/docker-with-aws.png"
                  width="80"
                  height="60"
                  alt="Docker logo"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
