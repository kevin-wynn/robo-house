export type User = {
  username: string;
  password?: string;
  name?: string | undefined;
  company?: string | undefined;
  address?: string | undefined;
  userType?: string;
  harvestID?: number;
};
