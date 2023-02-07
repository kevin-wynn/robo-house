import Link from "next/link";
import { Formik } from "formik";
import Router from "next/router";
import { useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import { Button } from "../../components/Button";
import { MaxWidthContent } from "../../components/MaxWidthContent";

const formClasses = `appearance-none border rounded w-full py-2 px-3 text-neutral-800 font-thin focus:outline-none focus:shadow-outline`;
const fieldRequiredMessage = "This field is required";

type ErrorType = {
  username?: string;
  password?: string;
  name?: string;
  company?: string;
  street?: string;
  state?: string;
  zipcode?: string;
  code?: string;
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
            By now you've taken the step forward and are ready to get started
            with Robo House. That's awesome news! You should have received a
            client sign up code by email already, go ahead and fill out the form
            and enter the code here to get started.
          </p>
          <div className="w-full">
            <Formik
              initialValues={{
                username: "",
                password: "",
                name: "",
                company: "",
                street: "",
                state: "",
                zipcode: "",
                code: "",
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
                if (!values.name) {
                  errors.name = fieldRequiredMessage;
                }
                if (!values.company) {
                  errors.company = fieldRequiredMessage;
                }
                if (!values.street) {
                  errors.street = fieldRequiredMessage;
                }
                if (!values.state) {
                  errors.state = fieldRequiredMessage;
                }
                if (!values.zipcode) {
                  errors.zipcode = fieldRequiredMessage;
                }
                if (!values.code) {
                  errors.code = fieldRequiredMessage;
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                setShowServerError(false);
                const body = JSON.stringify(values, null, 2);
                const res = await fetch("/api/user", {
                  method: "PUT",
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
                    <label className="pb-2 text-stone">Email</label>
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
                    <label className="pb-2 text-stone">Password</label>
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
                    <label className="pb-2 text-stone">Company Name</label>
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
                  <div className="pb-4 text-stone">Company Address</div>
                  <div className="pb-4">
                    <label className="pb-2 text-stone text-sm">Street</label>
                    <span className="text-sm text-red-400 ml-2">
                      {errors.street && touched.street && errors.street}
                    </span>
                    <input
                      type="text"
                      name="street"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.street}
                      className={formClasses}
                    />
                  </div>
                  <div className="pb-4 w-full grid grid-cols-2 gap-4">
                    <div>
                      <label className="pb-2 text-stone text-sm">State</label>
                      <span className="text-sm text-red-400 ml-2">
                        {errors.state && touched.state && errors.state}
                      </span>
                      <input
                        type="text"
                        name="state"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                        className={formClasses}
                      />
                    </div>
                    <div>
                      <label className="pb-2 text-stone text-sm">Zipcode</label>
                      <span className="text-sm text-red-400 ml-2">
                        {errors.zipcode && touched.zipcode && errors.zipcode}
                      </span>
                      <input
                        type="text"
                        name="zipcode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zipcode}
                        className={formClasses}
                      />
                    </div>
                  </div>
                  <div className="pb-8">
                    <label className="pb-2 text-stone text-sm">
                      Client Code
                    </label>
                    <span className="text-sm text-red-400 ml-2">
                      {errors.code && touched.code && errors.code}
                    </span>
                    <input
                      type="text"
                      name="code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.code}
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
      <div className="text-stone mt-6">
        Already a client?&nbsp;
        <Link className="underline" href="/client/login">
          Log in in today instead
        </Link>
        .
      </div>
    </Wrapper>
  );
}
