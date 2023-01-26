import Image from "next/image";
import { Formik } from "formik";
import { NextApiRequest } from "next";
import { useState } from "react";
import { Button } from "../components/Button";
import { HeroContent } from "../components/HeroContent";
import { MaxWidthContent } from "../components/MaxWidthContent";
import { Wrapper } from "../components/Wrapper";
import { getLoginSession } from "../helpers/Auth";

type ErrorType = {
  email?: string;
  name?: string;
  message?: string;
};

const formClasses = `appearance-none border rounded w-full py-2 px-3 text-black font-thin focus:outline-none focus:shadow-outline`;
const fieldRequiredMessage = "This field is required";

export default function Contact({ user }: { user: any }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerError, setShowServerError] = useState(false);
  return (
    <>
      <Wrapper
        header
        user={user}
        style="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-900 via-orange-500 to-indigo-700"
      >
        <MaxWidthContent>
          <HeroContent
            content={
              <>
                <div className="text-6xl md:text-8xl font-heavy font-black tracking-tighter">
                  Get In Touch.
                </div>
                <div className="text-stone flex flex-col w-full md:w-3/4">
                  <p className="text-3xl font-sans leading-snug mt-8 tracking-widest font-thin">
                    Drop a line to get your next project started. Need your
                    infrastructure worked on, migrated to Kubernetes? Reinforced
                    in any way? Got a marketing site you need set up? Done! Need
                    an application built? Easy!
                  </p>
                </div>
              </>
            }
            image={
              <Image
                src="/images/mech-house.png"
                alt="Get in touch with us today for your next project"
                width="500"
                height="500"
                priority
              />
            }
          />
        </MaxWidthContent>
      </Wrapper>
      <Wrapper footer footerDark style="mt-12">
        <MaxWidthContent>
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
        </MaxWidthContent>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const session = await getLoginSession(
    req.cookies[process.env.COOKIE_NAME || ""],
    process.env.TOKEN_SECRET || ""
  );
  return {
    props: {
      user: session?.passport?.user || null,
    },
  };
}
