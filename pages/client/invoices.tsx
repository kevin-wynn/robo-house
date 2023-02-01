import Dinero from "dinero.js";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { DashboardHeader } from "../../components/client/DashboardHeader";
import { Loader } from "../../components/Loader";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { Table } from "../../components/Table";
import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";

export default function InvoicesDashboard({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);

  const getAllProjects = async () => {
    const res = await fetch(`/api/harvest/invoices`);
    const json = await res.json();
    const { invoices } = json;
    console.log("json:", invoices);
    setInvoices(invoices);
    setLoading(false);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const data = useMemo(
    () =>
      invoices.map((invoice: any) => {
        return {
          col1: invoice.subject,
          col2: invoice.period_start,
          col3: invoice.period_end,
          col4: invoice.due_date,
          col5: Dinero({
            currency: "USD",
            amount: invoice.due_amount * 100,
          }).toFormat("$0,0.00"),
        };
      }),
    [invoices]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Subject",
        accessor: "col1",
      },
      {
        Header: "Start Date",
        accessor: "col2",
      },
      {
        Header: "End Date",
        accessor: "col3",
      },
      {
        Header: "Due Date",
        accessor: "col4",
      },
      {
        Header: "Amount",
        accessor: "col5",
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
          <h2 className="text-xl">Invoices</h2>
          <p>View and manage invoices created.</p>
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
