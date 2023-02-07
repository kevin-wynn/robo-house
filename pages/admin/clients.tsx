import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";
import { DashboardHeader } from "../../components/DashboardHeader";
import { User } from "../../types/User";
import { useEffect, useMemo, useState } from "react";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Loader } from "../../components/Loader";
import { Table } from "../../components/Table";
import { useTable } from "react-table";

export default function Clients({ user }: { user: User }) {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  const getContactFormSubmissions = async () => {
    const res = await fetch("/api/user/all");
    const { users } = await res.json();
    console.log("json:", users);
    setClients(users);
    setLoading(false);
  };

  useEffect(() => {
    getContactFormSubmissions();
  }, []);

  const data = useMemo(
    () =>
      clients.map((user: User) => {
        return {
          col1: user.name,
          col2: user.username,
          col3: user.company,
        };
      }),
    [clients]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1",
      },
      {
        Header: "Email",
        accessor: "col2",
      },
      {
        Header: "Company",
        accessor: "col3",
      },
    ],
    []
  ) as any;

  const tableInstance = useTable({ columns, data });

  return (
    <Wrapper
      dashboard
      header
      footer
      user={user}
      style="items-start bg-neutral-100"
    >
      <DashboardHeader admin user={user} />
      <MaxWidthContent>
        <div className="w-full flex flex-col -mt-6 items-start bg-white p-4">
          <h2 className="text-xl">Clients</h2>
          <p>View and manage all clients.</p>
          <div className="w-full flex flex-col items-center justify-center">
            {loading ? (
              <div className="h-44 w-full flex flex-col items-center justify-center">
                <Loader />
              </div>
            ) : clients.length ? (
              <Table tableInstance={tableInstance} />
            ) : (
              <div className="h-44 w-full flex flex-col items-center justify-center">
                <span className="text-4xl">😥</span>
                <p>No clients...</p>
              </div>
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
  if (!session.passport.user) {
    return {
      redirect: {
        destination: "/admin/login",
      },
    };
  }

  return {
    props: {
      user: session.passport.user,
    },
  };
}
