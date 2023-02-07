import { Formik } from "formik";
import { useState } from "react";
import { Button } from "../Button";

const formClasses = `appearance-none border rounded w-full py-2 px-3 text-neutral-800 font-thin focus:outline-none focus:shadow-outline`;
const fieldRequiredMessage = "This field is required";

type ErrorType = {
  username?: string;
};

export const CreateClientForm = ({
  closeAndRefreshModal,
}: {
  closeAndRefreshModal: any;
}) => {
  const [showServerError, setShowServerError] = useState(false);
  return (
    <div className="flex flex-col h-full justify-center items-center w-full mt-8">
      <h2 className="text-xl">Create a new client</h2>
      <div className="w-full p-6">
        <Formik
          initialValues={{ username: "" }}
          validate={(values) => {
            const errors: ErrorType = {};

            if (!values.username) {
              errors.username = fieldRequiredMessage;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
            ) {
              errors.username = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            setShowServerError(false);
            const body = JSON.stringify(values, null, 2);
            const res = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body,
            });
            // todo: clean this up with signup form logic, can be extracted and re-used a lot cleaner
            switch (res.status) {
              case 400:
                setShowServerError(true);
                setSubmitting(false);
                break;
              case 401:
                setSubmitting(false);
                break;
              case 200:
                const json = await res.json();
                closeAndRefreshModal();
                break;
              default:
                setShowServerError(true);
                setSubmitting(false);
                break;
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="px-24">
              {showServerError && (
                <p className="text-sm text-red-400 ml-2">
                  There was an error from the server. Try again!
                </p>
              )}
              <div className="pb-4">
                <label className="pb-2">Email</label>
                <span className="text-sm text-red-400 ml-2">
                  {errors.username && touched.username && errors.username}
                </span>
                <input
                  type="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={formClasses}
                />
              </div>
              <div className="mt-12">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Create Client
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
