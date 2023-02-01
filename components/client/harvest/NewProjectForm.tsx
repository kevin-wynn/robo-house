import { Formik } from "formik";
import { useState } from "react";
import { Button } from "../../Button";
import { MaxWidthContent } from "../../MaxWidthContent";
import Datepicker from "react-tailwindcss-datepicker";

const formClasses = `appearance-none border rounded w-full py-2 px-3 text-black font-thin focus:outline-none focus:shadow-outline`;
const fieldRequiredMessage = "This field is required";

type ErrorType = {
  budget?: string;
  name?: string;
};

export const NewProjectForm = ({
  getProjectsStatus,
  setOpenModal,
}: {
  getProjectsStatus: () => {};
  setOpenModal: any;
}) => {
  const [showServerError, setShowServerError] = useState(false);
  const [showUserPassError, setShowUserPassError] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue: any) => {
    setDatePickerValue(newValue);
  };

  return (
    <div className="flex flex-col h-full justify-center items-center w-full">
      <MaxWidthContent maxWidth="max-w-screen-sm">
        <h2 className="text-xl">Create A New Project</h2>
        <div className="w-full">
          <Formik
            initialValues={{
              budget: 0,
              name: "",
            }}
            validate={(values) => {
              const errors: ErrorType = {};

              if (!values.budget) {
                errors.budget = fieldRequiredMessage;
              } else if (!values.name) {
                errors.name = fieldRequiredMessage;
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              setShowServerError(false);
              setShowUserPassError(false);
              const formValues = { ...values, ...datePickerValue };
              console.log("form values:", formValues);

              const body = JSON.stringify(formValues, null, 2);
              await fetch("/api/harvest/projects", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body,
              });
              getProjectsStatus();
              setOpenModal(false);
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
                  <label className="pb-2">Project Name</label>
                  <span className="text-sm text-red-400 ml-2">
                    {errors.name && touched.name && errors.name}
                  </span>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={formClasses}
                  />
                </div>
                <div className="pb-4">
                  <label className="pb-2 ">
                    Budget <span className="text-sm">(In USD)</span>
                  </label>
                  <span className="text-sm text-red-400 ml-2">
                    {errors.budget && touched.budget && errors.budget}
                  </span>
                  <input
                    type="number"
                    name="budget"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.budget}
                    className={formClasses}
                  />
                </div>
                <div>
                  <div className="pb-4">
                    <label className="pb-2">Timeframe</label>
                    <div className={formClasses}>
                      <Datepicker
                        primaryColor="indigo"
                        value={datePickerValue}
                        onChange={handleValueChange}
                      />
                    </div>
                  </div>
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
        </div>
      </MaxWidthContent>
    </div>
  );
};
