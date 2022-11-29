export const ContactFormList = ({ forms }: { forms: any }) => {
  return (
    <div className="flex flex-col">
      <ul className="list-none">
        {forms.map((form: any) => (
          <li className="mb-6">
            <p>email: {form.email}</p>
            <p>name: {form.name}</p>
            <p>message: {form.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
