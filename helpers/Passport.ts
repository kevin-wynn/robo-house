import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByUsername, validatePassword } from "./UserHelper";

passport.serializeUser((user: any, done) => {
  done(null, user.username);
});

passport.deserializeUser((req: any, id: any, done: any) => {
  const user = getUserByUsername(id);
  done(null, user);
});

const strategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req: any, username: string, password: string, done: any) => {
    const user = await getUserByUsername(username);
    if (user) {
      const validPass = await validatePassword(user.password, password);
      if (!validPass) {
        done(null, null);
      } else {
        done(null, user);
      }
    } else {
      done(null, null);
    }
  }
);

passport.use(strategy);

export default passport;
