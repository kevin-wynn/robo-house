import { useMemo } from "react";
import { useTable } from "react-table";
import { ContactForm } from "../../types/ContactForm";
import { Table } from "../Table";

export const ContactFormList = ({ forms }: { forms: any }) => {
  const data = useMemo(
    () =>
      forms.map((form: ContactForm) => {
        return {
          col1: form.name,
          col2: form.email,
          col3: form.message,
        };
      }),
    []
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
        Header: "Message",
        accessor: "col3",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl text-spice font-serif">
        Contact Form Submissions
      </h2>
      <Table tableInstance={tableInstance} />
    </div>
  );
};
