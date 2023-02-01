import Dinero from "dinero.js";
import { useEffect, useState } from "react";
import { User } from "../../../types/User";
import { Loader } from "../../Loader";

export const InvoicesStatus = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(true);
  const [totalDue, setTotalDue] = useState(0);

  const getInvoices = async () => {
    const res = await fetch("/api/harvest/invoices");
    const json = await res.json();
    const { invoices } = json;
    if (invoices.length) {
      const dues = invoices.map((invoice: any) => {
        return invoice.due_amount;
      });
      const totalDue = dues.reduce((a: number, b: number) => {
        return a + b;
      });
      setTotalDue(totalDue);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="w-full bg-white p-6 flex flex-col justify-center items-center h-full col-span-1">
      {loading ? (
        <div className="w-full h-full justify-center items-center flex">
          <Loader />
        </div>
      ) : totalDue ? (
        <div className="w-full h-full flex justify-center items-center p-8 flex-col">
          <p className="text-6xl text-center mb-4">💸</p>
          <p className="text-4xl text-center mb-4">
            {Dinero({
              currency: "USD",
              amount: totalDue * 100,
            }).toFormat("$0,0.00")}
          </p>
          <p className="text-2xl text-center">Is due</p>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center p-8 flex-col">
          <p className="text-6xl text-center mb-4">🎉</p>
          <p className="text-2xl text-center">No invoices to pay.</p>
          <p className="text-2xl text-center">Yay!</p>
        </div>
      )}
    </div>
  );
};
