import Iron from "@hapi/iron";

export const createLoginSession = async (session: any, secret: any) => {
  const createdAt = Date.now();
  const obj = { ...session, createdAt };
  const token = await Iron.seal(obj, secret, Iron.defaults);
  return token;
};

export const getLoginSession = async (token: any, secret: any) => {
  const session = await Iron.unseal(token, secret, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;
  if (session.maxAge && Date.now() > expiresAt) {
    throw new Error("Session expired");
  }
  return session;
};
