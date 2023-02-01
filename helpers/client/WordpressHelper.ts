import { Wordpress } from "../../server/schemas/Wordpress";
import { User } from "../../types/User";
import { Wordpress as WordpressType } from "../../types/Wordpress";

export const getWordpressSite = (user: User) => {
  return {
    active: false,
    building: false,
  };
};

export const createNewWordpressSite = async (wordpress: WordpressType) => {
  const newWordpress = new Wordpress(wordpress);
  await newWordpress.save();
};
