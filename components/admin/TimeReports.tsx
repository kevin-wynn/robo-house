import Dinero from "dinero.js";
import { useMemo } from "react";
import { useTable } from "react-table";
import { TimeReport } from "../../types/TimeReport";
import { Table } from "../Table";

export const TimeReports = ({ timeReports }: { timeReports: TimeReport[] }) => {
  const data = useMemo(
    () =>
      timeReports.map((report: TimeReport) => {
        return {
          col1: report.client_id,
          col2: report.client_name,
          col3: report.billable_hours,
          col4: Dinero({
            currency: report.currency,
            amount: report.billable_amount * 100,
          }).toFormat("$0,0.00"),
          col5: report.total_hours,
        };
      }),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Client Id",
        accessor: "col1",
      },
      {
        Header: "Client Name",
        accessor: "col2",
      },
      {
        Header: "Billable Hours",
        accessor: "col3",
      },
      {
        Header: "Billable Amount",
        accessor: "col4",
      },
      {
        Header: "Total Hours",
        accessor: "col5",
      },
    ],
    []
  ) as any;

  const tableInstance = useTable({ columns, data });

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl text-spice">Time Reports</h2>
      <Table tableInstance={tableInstance} />
    </div>
  );
};
