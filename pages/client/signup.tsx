import Link from "next/link";
import { Formik } from "formik";
import Router from "next/router";
import { useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import { Button } from "../../components/Button";
import { MaxWidthContent } from "../../components/MaxWidthContent";
import { HeroContent } from "../../components/HeroContent";

const formClasses = `appearance-none border rounded w-full py-2 px-3 text-neutral-800 font-thin focus:outline-none focus:shadow-outline`;
const fieldRequiredMessage = "Required";

type ErrorType = {
  username?: string;
  password?: string;
  name?: string;
  company?: string;
  street?: string;
  state?: string;
  zipcode?: string;
  city?: string;
  code?: string;
};

export default function Signup() {
  const [showServerError, setShowServerError] = useState(false);
  const [showUnAuthorizedError, setShowUnAuthorizedError] = useState(false);
  const [showNotfoundError, setShowNotfoundError] = useState(false);
  const [showClientCodeError, setShowClientCodeError] = useState(false);
  return (
    <Wrapper header footer style="min-h-screen items-start">
      <div className="flex flex-col md:flex-row w-full p-8">
        <div className="w-full md:w-1/2">
          <HeroContent>
            <div className="p-6 w-full flex flex-col">
              <div className="text-5xl md:text-8xl font-serif tracking-tighter">
                Let&apos;s get started
              </div>
              <MaxWidthContent maxWidth="max-w-screen-md">
                <p className="text-xl mt-4 md:mt-6 tracking-wider mb-8">
                  By now you&apos;ve taken the step forward and are ready to get
                  started with Robo House. That&apos;s awesome news! You should
                  have received a client sign up code by email already, go ahead
                  and fill out the form and enter the code here to get started.
                </p>
              </MaxWidthContent>
            </div>
          </HeroContent>
        </div>
        <div className="w-full md:w-1/2">
          <Formik
            initialValues={{
              username: "",
              password: "",
              name: "",
              company: "",
              street: "",
              state: "",
              zipcode: "",
              city: "",
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
              // this can probably be improved
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
              if (!values.city) {
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
              setShowUnAuthorizedError(false);
              setShowClientCodeError(false);
              setShowNotfoundError(false);
              const body = JSON.stringify(values, null, 2);
              const res = await fetch("/api/user", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body,
              });
              switch (res.status) {
                case 500:
                case 400: // server errors
                  setShowServerError(true);
                  setSubmitting(false);
                  break;
                case 401: // unauthorized
                  setShowUnAuthorizedError(true);
                  setSubmitting(false);
                  break;
                case 403: // client code incorrect
                  setShowClientCodeError(true);
                  setSubmitting(false);
                  break;
                case 404: // user not found
                  setShowNotfoundError(true);
                  setSubmitting(false);
                  break;
                case 200: // success, log user in and continue on
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
                      // set unauthorized
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
              <form onSubmit={handleSubmit} className="max-w-xl">
                {showServerError && (
                  <p className="text-red-400 mb-2">
                    There was an error from the server. Try again!
                  </p>
                )}
                {showUnAuthorizedError && (
                  <p className="text-red-400 mb-2">Unauthorized. Try again!</p>
                )}
                {showNotfoundError && (
                  <p className="text-red-400 mb-2">
                    User not found. Try again!
                  </p>
                )}
                {showClientCodeError && (
                  <p className="text-red-400 mb-2">
                    Client code is incorrect. Try again!
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
                <div className="pb-4">
                  <label className="pb-2">Your Name</label>
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
                  <label className="pb-2">Company Name</label>
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
                <div className="pb-4">Company Address</div>
                <div className="pb-4">
                  <label className="pb-2  text-sm">Street</label>
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
                <div className="pb-4 w-full grid grid-cols-3 gap-4">
                  <div>
                    <label className="pb-2  text-sm">City</label>
                    <span className="text-sm text-red-400 ml-2">
                      {errors.city && touched.city && errors.city}
                    </span>
                    <input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      className={formClasses}
                    />
                  </div>
                  <div>
                    <label className="pb-2  text-sm">State</label>
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
                    <label className="pb-2  text-sm">Zipcode</label>
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
                  <label className="pb-2  text-sm">Client Code</label>
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
          <div className="mt-6">
            Already a client?&nbsp;
            <Link className="underline" href="/client/login">
              Log in instead
            </Link>
            .
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
