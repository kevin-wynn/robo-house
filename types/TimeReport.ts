import { Currency } from "dinero.js";

export type TimeReport = {
  billable_amount: number;
  billable_hours: number;
  client_id: number;
  client_name: string;
  total_hours: number;
  currency: Currency;
};
