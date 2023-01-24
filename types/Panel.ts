import { ReactElement } from "react";

export type Panel = {
  title: string;
  hash: string;
  content: ReactElement;
};
