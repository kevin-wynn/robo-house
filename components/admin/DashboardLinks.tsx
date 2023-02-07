import Link from "next/link";

export const AdminDashboardLinks = () => (
  <div className="flex justify-center items-center flex-row">
    <Link href="/admin" className="text-stone text-xs mt-4 underline mr-4">
      home
    </Link>
    <Link
      href="/admin/contacts"
      className="text-stone text-xs mt-4 underline mr-4"
    >
      contacts
    </Link>
    <Link
      href="/admin/clients"
      className="text-stone text-xs mt-4 underline mr-4"
    >
      clients
    </Link>
  </div>
);
