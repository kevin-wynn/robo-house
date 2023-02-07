import Link from "next/link";

export const ClientDashboardLinks = () => (
  <div className="flex justify-center items-center flex-row">
    <Link href="/client" className="text-stone text-xs mt-4 underline mr-4">
      home
    </Link>
    <Link
      href="/client/timesheets"
      className="text-stone text-xs mt-4 underline mr-4"
    >
      timesheets
    </Link>
    <Link
      href="/client/projects"
      className="text-stone text-xs mt-4 underline mr-4"
    >
      projects
    </Link>
    <Link
      href="/client/invoices"
      className="text-stone text-xs mt-4 underline mr-4"
    >
      invoices
    </Link>
  </div>
);
