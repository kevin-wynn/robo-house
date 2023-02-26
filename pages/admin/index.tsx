import { ContactFormList } from "../../components/admin/ContactFormList";
import { ClientList } from "../../components/admin/ClientList";
import { TimeReports } from "../../components/admin/TimeReports";
import { Wrapper } from "../../components/Wrapper";
import { getLoginSession } from "../../helpers/Auth";
import { getAllContactFormSubmissions } from "../../helpers/ContactFormHelper";
import {
  getHarvestClients,
  getHarvestTimeReports,
} from "../../helpers/HarvestHelper";
import { TabPanel } from "../../components/admin/TabPanel";
import { DashboardHeader } from "../../components/DashboardHeader";

export default function AdminDashboard({
  contactForms,
  user,
  clients,
  timeReports,
}: {
  contactForms: any;
  user: any;
  clients: any;
  timeReports: any;
}) {
  return (
    <Wrapper header footer user={user} style="items-start">
      <DashboardHeader admin user={user} />
      <div className="w-full grid grid-cols-4 gap-4 -mt-6 items-stretch"></div>
      <div className="flex flex-col min-h-screen h-full items-center w-full">
        <div className="w-full justify-center flex flex-col p-12">
          {/* move these to just use pages... keep tab panel for later use if i need it though */}
          <TabPanel
            panels={[
              {
                title: "Contact Form Submissions",
                hash: "#contact",
                content: <ContactFormList forms={contactForms} />,
              },
              {
                title: "Clients",
                hash: "#clients",
                content: <ClientList clients={clients.clients} />,
              },
              {
                title: "Time Reports",
                hash: "#time",
                content: <TimeReports timeReports={timeReports.results} />,
              },
            ]}
          />
        </div>
      </div>
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
  const clients = await getHarvestClients();
  const timeReports = await getHarvestTimeReports();
  const contactForms = await getAllContactFormSubmissions();
  return {
    props: {
      user: session.passport.user,
      contactForms: JSON.parse(JSON.stringify(contactForms)),
      clients,
      timeReports,
    },
  };
}
