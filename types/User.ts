// todo: see this for better typing https://mongoosejs.com/docs/typescript.html

export type User = {
  _id: string;
  username: string;
  password?: string;
  name?: string;
  company?: string;
  street?: string;
  zipcode?: string;
  state?: string;
  userType?: string;
  harvestID?: number;
  code?: number;
  active: boolean;
};
