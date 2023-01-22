import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { Button } from "../components/Button";
import { Wrapper } from "../components/Wrapper";

type ErrorType = {
  email?: string;
  name?: string;
  message?: string;
};

const formClasses = `appearance-none border rounded w-full py-2 px-3 text-black font-thin focus:outline-none focus:shadow-outline`;
const fieldRequiredMessage = "This field is required";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerError, setShowServerError] = useState(false);
  return (
    <Wrapper header footer>
      <div className="flex flex-col mt-12 justify-center items-center w-full h-full font-thin">
        <div className="w-full md:w-1/2 mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif text-spice mb-8">
            get in touch
          </h1>
          <p className="text-sm leading-8 tracking-widest font-thin">
            Drop a line to get your next project started. Need your
            infrastructure worked on, migrated to Kubernetes? Reinforced in any
            way? Got a marketing site you need set up? Done! Need an application
            built? Easy!
          </p>
        </div>
        {showSuccess ? (
          <div>
            <p>{successMessage}</p>
          </div>
        ) : (
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validate={(values) => {
              const errors: ErrorType = {};

              if (!values.message) {
                errors.message = fieldRequiredMessage;
              }

              if (!values.email) {
                errors.email = fieldRequiredMessage;
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              setShowServerError(false);
              const body = JSON.stringify(values, null, 2);
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body,
              });

              switch (res.status) {
                case 400:
                  setShowServerError(true);
                  break;
                case 201:
                  setSuccessMessage("Got it! I'll be in touch soon!");
                  setShowSuccess(true);
                  break;
                case 202:
                  setSuccessMessage(
                    "I already have a submission for this email, I'll be in touch soon!"
                  );
                  setShowSuccess(true);
                default:
                  break;
              }

              if (res.status === 400) {
                setShowServerError(true);
              } else {
                setShowSuccess(true);
              }

              setSubmitting(false);
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
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-0 w-full md:w-1/2"
              >
                {showServerError && (
                  <p className="text-sm text-red-400 ml-2">
                    There was an error from the server. Try again!
                  </p>
                )}
                <div className="pb-4">
                  <label className="pb-2">Name</label>
                  {errors.name && touched.name && errors.name}
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={formClasses}
                  />
                </div>
                <div className="pb-4">
                  <label className="pb-2">Email</label>
                  <span className="text-sm text-red-400 ml-2">
                    {errors.email && touched.email && errors.email}
                  </span>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={formClasses}
                  />
                </div>
                <div className="pb-4">
                  <label className="pb-2">Message</label>
                  <span className="text-sm text-red-400 ml-2">
                    {errors.message && touched.message && errors.message}
                  </span>
                  <textarea
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    className={`${formClasses} h-56`}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </Wrapper>
  );
}
