import argon2 from "argon2";
import { User } from "../server/schemas/User";

export const getUserById = async (id: string) => {
  return await User.findById(id).lean();
};

export const getUserByUsername = async (username: string) => {
  return await User.findOne({ username }).lean();
};

export const createUser = async (body: {
  username: string;
  password: string;
}) => {
  const user = await getUserByUsername(body.username);
  if (user) {
    return user;
  } else {
    const hashedPassword = await hashPassword(body.password);
    const userToSave = {
      username: body.username,
      password: hashedPassword,
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
