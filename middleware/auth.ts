import nextConnect from "next-connect";
import passport from "../helpers/Passport";
import session from "../helpers/Session";

const auth = nextConnect()
  .use(
    session({
      name: process.env.COOKIE_NAME,
      secret: process.env.TOKEN_SECRET,
      cookie: {
        maxAge: 60 * 60 * 24 * 30, // 30 days?
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session());

export default auth;
