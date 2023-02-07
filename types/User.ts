export type User = {
  _id: string;
  username: string;
  password?: string;
  name: string;
  company: string;
  street: string;
  zipcode: string;
  state: string;
  userType?: string;
  harvestID?: number;
};
