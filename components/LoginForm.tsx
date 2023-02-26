import { Formik } from "formik";
import Router from "next/router";
import { useState } from "react";
import { Button } from "./Button";

const formClasses = `appearance-none border rounded w-full py-2 px-3 text-neutral-800 font-thin focus:outline-none focus:shadow-outline`;
const fieldRequiredMessage = "This field is required";

type ErrorType = {
  username?: string;
  password?: string;
};

export const LoginForm = () => {
  const [showServerError, setShowServerError] = useState(false);
  const [showUserPassError, setShowUserPassError] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors: ErrorType = {};

            if (!values.username) {
              errors.username = fieldRequiredMessage;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
            ) {
              errors.username = "Invalid email address";
            }
            if (!values.password) {
              errors.password = fieldRequiredMessage;
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            setShowServerError(false);
            setShowUserPassError(false);
            const body = JSON.stringify(values, null, 2);
            const res = await fetch("/api/login", {
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
                setShowUserPassError(true);
                setSubmitting(false);
                break;
              case 200:
                const json = await res.json();
                if (json.user?.userType === "admin") {
                  Router.push("/admin");
                } else {
                  Router.push("/client");
                }
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
            <form onSubmit={handleSubmit} className="max-w-xl">
              {showServerError && (
                <p className="text-sm text-red-400 ml-2">
                  There was an error from the server. Try again!
                </p>
              )}
              {showUserPassError && (
                <p className="text-sm text-red-400 ml-2">
                  Your Username or Password were incorrect. Try again!
                </p>
              )}
              <div className="pb-4">
                <label className="pb-2">Username</label>
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
              <div className="pb-4">
                <label className="pb-2">Password</label>
                <span className="text-sm text-red-400 ml-2">
                  {errors.password && touched.password && errors.password}
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={formClasses}
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
      </div>
    </div>
  );
};
