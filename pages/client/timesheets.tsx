import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { DashboardHeader } from "../../components/client/DashboardHeader";
import { Loader } from "../../components/Loader";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Table } from "../../components/Table";
import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";

export default function TimesheetsDashboard({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);
  const [timesheets, setTimesheets] = useState([]);

  const getAllTimeSheets = async () => {
    const res = await fetch(`/api/harvest/timesheets`);
    const json = await res.json();
    setTimesheets(json);
    setLoading(false);
  };

  useEffect(() => {
    getAllTimeSheets();
  }, []);

  const data = useMemo(
    () =>
      timesheets.map((timesheet: any) => {
        return {
          col1: timesheet.spent_date,
          col2: timesheet.project.name,
          col3: timesheet.task.name,
          col4: timesheet.hours,
        };
      }),
    [timesheets]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "col1",
      },
      {
        Header: "Project",
        accessor: "col2",
      },
      {
        Header: "Task",
        accessor: "col3",
      },
      {
        Header: "Hours",
        accessor: "col4",
      },
    ],
    []
  ) as any;

  const tableInstance = useTable({ columns, data });

  return (
    <Wrapper dashboard header footer user={user} style="items-start bg-stone">
      <DashboardHeader user={user} />
      <MaxWidthContent>
        <div className="w-full flex flex-col -mt-6 items-start bg-white p-4">
          <h2 className="text-xl">Timesheets</h2>
          <p>View and manage timesheets created for your projects.</p>
          <div className="w-full flex flex-col items-center justify-center">
            {loading ? (
              <div className="h-44 w-full flex flex-col items-center justify-center">
                <Loader />
              </div>
            ) : (
              <Table tableInstance={tableInstance} />
            )}
          </div>
        </div>
      </MaxWidthContent>
    </Wrapper>
  );
}

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  const session = await getLoginSession(
    req.cookies[process.env.COOKIE_NAME || ""],
    process.env.TOKEN_SECRET || ""
  );
  if (!session?.passport?.user) {
    return {
      redirect: {
        destination: "/client/login",
      },
    };
  }

  return {
    props: {
      user: session.passport.user,
    },
  };
}
