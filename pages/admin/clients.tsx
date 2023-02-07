import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";
import { DashboardHeader } from "../../components/DashboardHeader";
import { User } from "../../types/User";
import { useEffect, useMemo, useState } from "react";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Loader } from "../../components/Loader";
import { Table } from "../../components/Table";
import { useTable } from "react-table";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CreateClientForm } from "../../components/admin/CreateClientForm";

export default function Clients({ user }: { user: User }) {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [clients, setClients] = useState([]);

  const getContactFormSubmissions = async () => {
    const res = await fetch("/api/user/all");
    const { users } = await res.json();
    setClients(users);
    setLoading(false);
  };

  const closeAndRefreshModal = () => {
    getContactFormSubmissions();
    setOpenModal(false);
  };

  useEffect(() => {
    getContactFormSubmissions();
  }, []);

  const data = useMemo(
    () =>
      clients.map((user: User) => {
        return {
          col1: user.name || "Not set yet",
          col2: user.username,
          col3: user.company || "Not set yet",
          col4: user.code,
          col5: user.active ? "Active" : "Inactive",
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
      {
        Header: "Client Code",
        accessor: "col4",
      },
      {
        Header: "Active",
        accessor: "col5",
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
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateClientForm closeAndRefreshModal={closeAndRefreshModal} />
      </Modal>
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
          <div className="my-8 w-full flex flex-col items-center justify-center">
            <Button
              type="button"
              disabled={false}
              onClick={() => setOpenModal(true)}
            >
              Create a new client
            </Button>
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
