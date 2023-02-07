import argon2 from "argon2";
import dbConnect from "../server/database";
import { User } from "../server/schemas/User";
import { User as UserType } from "../types/User";

export const getUserById = async (id: string) => {
  await dbConnect();
  return await User.findById(id).lean();
};

export const getAllUsersButAdmin = async () => {
  await dbConnect();
  return await User.find({ userType: "client" }).select("-password").lean();
};

export const getUserByUsername = async (user: string | UserType) => {
  // todo: this is hacky and not ideal, but sometimes the session is passport.user = 'username' sometimes its passport.user = UserType
  // not sure why it does this, will need to trace back sessions and passport stuff here probably
  await dbConnect();
  if (user) {
    let usernameLookup = "";
    if (typeof user === "string") {
      usernameLookup = user;
    } else if (typeof user === "object") {
      usernameLookup = user.username;
    }
    return await User.findOne({ username: usernameLookup })
      .select("-password")
      .lean();
  }
};

export const getUserByCompanyName = async (company: string) => {
  await dbConnect();
  return await User.findOne({ company });
};

export const createUser = async (body: { username: string }) => {
  const user = await getUserByUsername(body.username);
  if (user) {
    return user;
  } else {
    const userToSave = {
      username: body.username,
      userType: "client",
      code: Math.floor(100000 + Math.random() * 900000),
    };
    const newUser = new User(userToSave);
    const savedUser = await newUser.save();
    return savedUser;
  }
};

export const updateUserById = async (userId: string, body: UserType) => {
  const hashedPassword = await hashPassword(body.password as string);
  const userToSave = {
    username: body.username,
    password: hashedPassword,
    name: body.name,
    company: body.company,
    street: body.street,
    zipcode: body.zipcode,
    state: body.state,
    harvestID: body.harvestID,
  };
  return await User.findByIdAndUpdate(userId, userToSave);
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
