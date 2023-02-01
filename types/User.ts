export type User = {
  username: string;
  password?: string;
  name?: string | undefined;
  company: string;
  address?: string | undefined;
  userType?: string;
  harvestID?: number;
};
