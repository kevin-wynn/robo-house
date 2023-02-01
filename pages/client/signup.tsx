import Link from "next/link";
import { Formik } from "formik";
import Router from "next/router";
import { useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import { Button } from "../../components/Button";
import { MaxWidthContent } from "../../components/MaxWidthContent";

const formClasses = `appearance-none border rounded w-full py-2 px-3 text-black font-thin focus:outline-none focus:shadow-outline`;
const fieldRequiredMessage = "This field is required";

type ErrorType = {
  username?: string;
  password?: string;
  name?: string;
  company?: string;
  address?: string;
};

export default function Signup() {
  const [showServerError, setShowServerError] = useState(false);
  return (
    <Wrapper
      header
      footer
      style="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-900 via-orange-500 to-indigo-700"
    >
      <div className="flex flex-col h-full justify-center items-center w-full">
        <MaxWidthContent maxWidth="max-w-screen-sm">
          <h1 className="text-4xl text-stone mb-2">Let's get started</h1>
          <p className="text-md text-stone mb-8">
            Sign up today and get started hosting your site or application
            immediately. Take it another step to set up projects for design,
            development, or anything else.
          </p>
          <div className="w-full">
            <Formik
              initialValues={{
                username: "",
                password: "",
                name: "",
                company: "",
                address: "",
              }}
              validate={(values) => {
                const errors: ErrorType = {};

                if (!values.username) {
                  errors.username = fieldRequiredMessage;
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    values.username
                  )
                ) {
                  errors.username = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = fieldRequiredMessage;
                }
                if (!values.company) {
                  errors.company = fieldRequiredMessage;
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
                switch (res.status) {
                  case 400:
                    setShowServerError(true);
                    setSubmitting(false);
                    break;
                  case 401:
                    console.log("unauthorized");
                    setSubmitting(false);
                    break;
                  case 200:
                    // todo: clean this up with login form logic, can be extracted and re-used a lot cleaner
                    const body = JSON.stringify(
                      {
                        username: values.username,
                        password: values.password,
                      },
                      null,
                      2
                    );
                    const res = await fetch("/api/login", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body,
                    });
                    switch (res.status) {
                      case 400:
                        setShowServerError(true);
                        setSubmitting(false);
                        break;
                      case 401:
                        console.log("unauthorized");
                        setSubmitting(false);
                        break;
                      case 200:
                        Router.push("/client");
                        break;
                      default:
                        setShowServerError(true);
                        setSubmitting(false);
                        break;
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
                <form onSubmit={handleSubmit} className="px-24">
                  {showServerError && (
                    <p className="text-sm text-red-400 ml-2">
                      There was an error from the server. Try again!
                    </p>
                  )}
                  <div className="pb-4">
                    <label className="pb-2 text-stone">Email Address*</label>
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
                    <label className="pb-2 text-stone">Password*</label>
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
                  <div className="pb-4">
                    <label className="pb-2 text-stone">Your Name</label>
                    <span className="text-sm text-red-400 ml-2">
                      {errors.name && touched.name && errors.name}
                    </span>
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
                    <label className="pb-2 text-stone">Company Name*</label>
                    <span className="text-sm text-red-400 ml-2">
                      {errors.company && touched.company && errors.company}
                    </span>
                    <input
                      type="company"
                      name="company"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.company}
                      className={formClasses}
                    />
                  </div>
                  <div className="pb-4">
                    <label className="pb-2 text-stone">Company Address</label>
                    <span className="text-sm text-red-400 ml-2">
                      {errors.address && touched.address && errors.address}
                    </span>
                    <input
                      type="address"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
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
        </MaxWidthContent>
      </div>
      <div className="text-stone">
        Already a client?&nbsp;
        <Link className="underline" href="/client/login">
          Log in in today instead
        </Link>
        .
      </div>
    </Wrapper>
  );
}
