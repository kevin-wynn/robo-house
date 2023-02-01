import argon2 from "argon2";
import dbConnect from "../server/database";
import { User } from "../server/schemas/User";
import { User as UserType } from "../types/User";

export const getUserById = async (id: string) => {
  await dbConnect();
  return await User.findById(id).lean();
};

export const getUserByUsername = async (user: string | UserType) => {
  // todo: this is hacky and not idea, but sometimes the session is passport.user = 'username' sometimes its passport.user = UserType
  await dbConnect();
  if (user) {
    let usernameLookup = "";
    if (typeof user === "string") {
      usernameLookup = user;
    } else if (typeof user === "object") {
      usernameLookup = user.username;
    }
    return await User.findOne({ username: usernameLookup }).lean();
  }
};

export const getUserByCompanyName = async (company: string) => {
  await dbConnect();
  return await User.findOne({ company });
};

export const createUser = async (body: UserType) => {
  const user = await getUserByUsername(body.username);
  if (user) {
    return user;
  } else {
    const hashedPassword = await hashPassword(body.password as string);
    const userToSave = {
      username: body.username,
      password: hashedPassword,
      name: body.name,
      company: body.company,
      userType: "client",
      address: body.address,
      harvestID: body.harvestID,
    };
    const newUser = new User(userToSave);
    const savedUser = await newUser.save();
    return savedUser;
  }
};

export const validatePassword = async (
  userPassword: string,
  password: string
) => {
  return await argon2.verify(userPassword, password);
};

export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};
