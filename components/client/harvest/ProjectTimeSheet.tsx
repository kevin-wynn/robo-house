import Link from "next/link";
import { useState } from "react";

export const ProjectTimeSheets = ({
  projectId,
  timesheets,
}: {
  projectId: number;
  timesheets: any;
}) => {
  const [expanded, setExpanded] = useState(false);
  const projectsTimesheets = timesheets.filter((timesheet: any) => {
    return timesheet.project.id === projectId;
  });
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <button
          className="text-sm outline-none"
          type="button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <div className="flex flex-row justify-center items-center">
              <span className="underline mr-2">Timesheets</span>{" "}
              <span className="text-xs mt-1">&#9650;</span>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center">
              <span className="underline mr-2">Timesheets</span>{" "}
              <span className="text-xs mt-1">&#9660;</span>
            </div>
          )}
        </button>
      </div>
      {expanded && (
        <div>
          {projectsTimesheets.map((timesheet: any, i: number) =>
            i < 2 ? (
              <div
                key={timesheet.id}
                className="text-xs break-keep mt-4 border-1 border-neutral-400 p-2 rounded-sm"
              >
                <p className="mb-2">
                  On <b>{timesheet.spent_date}</b>,
                </p>
                <p className="mb-2">
                  <b>{timesheet.user.name}</b> spent <b>{timesheet.hours}hrs</b>{" "}
                  working on <b>{timesheet.project.name}</b> doing{" "}
                  <b>{timesheet.task.name}</b>.
                </p>
                <p className="mb-2">The following notes were left:</p>
                <p>
                  <b>{timesheet.notes}</b>
                </p>
              </div>
            ) : (
              <div
                key={i}
                className="text-xs break-keep mt-4 border-1 border-neutral-400 p-2 rounded-sm"
              >
                To view more timesheets dating further back, visit your{" "}
                <Link className="underline" href="/client/timesheets">
                  timesheets
                </Link>{" "}
                tab.
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
