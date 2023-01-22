export const TimeReports = ({ timeReports }: { timeReports: any }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl text-spice font-serif">Time Reports</h2>
      <div className="w-full">
        {timeReports.results.map((report: any) => (
          <div key={report.client_id} className="flex flex-col">
            <p>Client: {report.client_name}</p>
            <p>Billable Hours: {report.billable_hours}hrs</p>
            <p>Billable Amount: ${report.billable_amount}.00</p>
          </div>
        ))}
      </div>
    </div>
  );
};
