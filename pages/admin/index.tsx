import { ContactFormList } from "../../components/admin/ContactFormList";
import { Wrapper } from "../../components/Wrapper";
import { getAllContactFormSubmissions } from "../../helpers/ContactFormHelper";

export default function Home({ contactForms }: { contactForms: any }) {
  //TODO: typing
  return (
    <Wrapper>
      <div className="flex flex-col h-full justify-center items-center w-full p-2 md:p-0">
        <div className="mb-6">
          <h1>Admin...</h1>
        </div>
        <div>
          <ContactFormList forms={contactForms} />
        </div>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps() {
  const contactForms = await getAllContactFormSubmissions();
  return {
    props: {
      contactForms: JSON.parse(JSON.stringify(contactForms)),
    },
  };
  return { props: {} };
}
