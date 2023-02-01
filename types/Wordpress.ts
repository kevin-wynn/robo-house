import { User } from "./User";

export type Wordpress = {
  ip?: string;
  dbRootPass?: string;
  dbWordpressPass?: string;
  subdomain?: string;
  building: boolean;
  active: boolean;
  user: User;
};
