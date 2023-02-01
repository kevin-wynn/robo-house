import Dinero from "dinero.js";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { DashboardHeader } from "../../components/client/DashboardHeader";
import { Loader } from "../../components/Loader";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Table } from "../../components/Table";
import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";

export default function ProjectsDashboard({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getAllProjects = async () => {
    const res = await fetch(`/api/harvest/projects`);
    const json = await res.json();
    // todo pull in all billed hours and budgets so we can do some math
    // to show remaining budget and hours spent, maybe link to invoices when
    // thet are available here too
    setProjects(json);
    setLoading(false);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const data = useMemo(
    () =>
      projects.map((project: any) => {
        return {
          col1: project.name,
          col2: project.starts_on,
          col3: project.ends_on,
          col4: Dinero({
            currency: "USD",
            amount: project.budget * 100,
          }).toFormat("$0,0.00"),
        };
      }),
    [projects]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1",
      },
      {
        Header: "Start On",
        accessor: "col2",
      },
      {
        Header: "Ends On",
        accessor: "col3",
      },
      {
        Header: "Budget",
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
          <h2 className="text-xl">Projects</h2>
          <p>View and manage projects created.</p>
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
