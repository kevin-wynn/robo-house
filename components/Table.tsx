export const Table = ({ tableInstance }: { tableInstance: any }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()} className="w-full mt-4">
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup: any, index: number) => (
            // Apply the header row props
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column: any, index: number) => (
                  // Apply the header cell props
                  <th
                    key={index}
                    {...column.getHeaderProps()}
                    className="text-left p-2 border-sand border-1 bg-zinc-800"
                  >
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row: any, index: number) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr
                key={index}
                {...row.getRowProps()}
                className="even:bg-zinc-900"
              >
                {
                  // Loop over the rows cells
                  row.cells.map((cell: any, index: number) => {
                    // Apply the cell props
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className="p-2 border-1 border-sand"
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
