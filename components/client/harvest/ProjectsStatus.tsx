import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "../../../types/User";
import { Button } from "../../Button";
import { Loader } from "../../Loader";
import { ProjectTimeSheets } from "./ProjectTimeSheet";

export const ProjectsStatus = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [projectsStatus, setProjectsStatus] = useState([]);
  const [timesheets, setTimesheets] = useState([]);

  const getProjectsStatus = async () => {
    const res = await fetch("/api/harvest/projects");
    const json = await res.json();
    json.forEach(async (project: any) => {
      const json = await getProjectTimeSheet(project.id);
    });
    setProjectsStatus(json);
    setLoading(false);
  };

  const getProjectTimeSheet = async (projectId: number) => {
    const res = await fetch(`/api/harvest/timesheets?projectId=${projectId}`);
    const json = await res.json();
    setTimesheets(json);
  };

  useEffect(() => {
    getProjectsStatus();
  }, []);
  return (
    <>
      <div className="w-full bg-white p-6 flex flex-col justify-center items-center h-full col-span-2">
        {loading ? (
          <div className="w-full h-full justify-center items-center flex">
            <Loader />
          </div>
        ) : projectsStatus.length > 0 ? (
          <>
            {projectsStatus.map((project: any) => {
              const start = dayjs(project.starts_on);
              const end = dayjs(project.ends_on);
              const today = dayjs();
              const totalDiff = end.diff(start, "day");
              const elapsedDiff = today.diff(start, "day");
              const percentElapsed = Math.round(
                (elapsedDiff / totalDiff) * 100
              );
              return (
                <div
                  key={project.id}
                  className="w-full flex justify-center items-start flex-col p-6 break-all"
                >
                  <span className="text-xl font-bold mb-4">{project.name}</span>
                  <div className="w-full flex justify-center items-center flex-row">
                    <div className="flex justify-center items-center text-sm mr-4 min-w-fit">
                      {start.format("MM/DD/YY")}
                    </div>
                    <div className="relative w-full">
                      <div className="overflow-hidden text-xs flex rounded-full bg-neutral-400">
                        <div
                          style={{
                            width: `${percentElapsed}%`,
                          }}
                          className="shadow-non h-2 flex flex-col text-center whitespace-nowrap text-white justify-center bg-neutral-700"
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm ml-4 min-w-fit">
                      {end.format("MM/DD/YY")}
                    </div>
                  </div>
                  {timesheets.length > 0 && (
                    <ProjectTimeSheets
                      timesheets={timesheets}
                      projectId={project.id}
                    />
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/images/logos/harvest.png"
              width="60"
              height="60"
              alt="Harvest logo"
            />
            <span className="text-sm mt-4">
              You have no projects. Set one up now to get started.
            </span>
            <div className="flex flex-row justify-around w-full mt-4">
              <Button
                type="button"
                onClick={() => {
                  setOpenModal(true);
                }}
                disabled={false}
              >
                Create A Project
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
