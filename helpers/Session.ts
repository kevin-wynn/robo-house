import { parse, serialize } from "cookie";
import { createLoginSession, getLoginSession } from "./Auth";

const parseCookies = (req: any) => {
  if (req.cookies) return req.cookies;
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
};

const session = ({
  name,
  secret,
  cookie: cookieOpts,
}: {
  name: any;
  secret: any;
  cookie: any;
}) => {
  return async (req: any, res: any, next: any) => {
    const cookies = parseCookies(req);
    const token = cookies[name];
    let unsealed = {};
    if (token) {
      try {
        unsealed = await getLoginSession(token, secret);
      } catch (e) {
        // cookie is invalid
      }
    }
    req.session = unsealed;
    const oldEnd = res.end;
    const resEndProxy = async (...args: any) => {
      if (res.finished || res.writableEnded || res.headersSent) return;
      if (cookieOpts.maxAge) {
        req.session.maxAge = cookieOpts.maxAge;
      }
      const token = await createLoginSession(req.session, secret);
      res.setHeader("Set-Cookie", serialize(name, token, cookieOpts));
      oldEnd.apply(this, args);
    };
    res.end = resEndProxy;
    next();
  };
};

export default session;
