import { useMemo } from "react";
import { useTable } from "react-table";
import { Client } from "../../types/Client";
import { Table } from "../Table";

export const ClientList = ({ clients }: { clients: Client[] }) => {
  const data = useMemo(
    () =>
      clients.map((client: Client) => {
        return {
          col1: client.id,
          col2: client.name,
          col3: client.address,
        };
      }),
    [clients]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "col1",
      },
      {
        Header: "Name",
        accessor: "col2",
      },
      {
        Header: "Address",
        accessor: "col3",
      },
    ],
    []
  ) as any;

  const tableInstance = useTable({ columns, data });

  return (
    <div className="flex flex-col">
      {clients.map((client: any) => (
        <div key={client.id}>
          <h2 className="text-3xl text-spice">Clients</h2>
          <Table tableInstance={tableInstance} />
        </div>
      ))}
    </div>
  );
};
