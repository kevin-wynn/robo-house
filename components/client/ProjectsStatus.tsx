import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";

export const ProjectsStatus = () => {
  const [openModal, setOpenModal] = useState(false);
  const [projectsStatus, setProjectsStatus] = useState([]);
  useEffect(() => {
    const getProjectsStatus = async () => {
      // const json = await GetEC2Instances();
      // console.log("json:", json);
      // projectsStatus(json);
    };
    getProjectsStatus();
  }, []);
  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="flex flex-col w-full">
          <p>wanna do a new project or something bro?</p>
        </div>
      </Modal>
      <div className="w-full bg-white p-4 flex flex-col justify-center items-center h-64 col-span-2">
        {projectsStatus.length > 0 ? (
          <div>
            <p>okay you got projects good for you</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm">
              You have no projects. Set one up now to get started.
            </span>
            <div className="flex flex-row justify-around w-full mt-4">
              <button
                className="outline-none"
                type="button"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <Image
                  src="/images/logos/harvest.png"
                  width="60"
                  height="60"
                  alt="Harvest logo"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
