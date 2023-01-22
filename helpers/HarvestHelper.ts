const HARVEST_BASE_URL = "https://api.harvestapp.com/v2";

export const getHarvestClients = async () => {
  const res = await fetch(`${HARVEST_BASE_URL}/clients`, {
    headers: {
      Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
      "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
      "User-Agent": "Robo House (kevin@robo-house.com)",
    },
  });
  return await res.json();
};

// specify to and from if you want to change the default reporting time
// default reporting time is for the current month
export const getHarvestTimeReports = async (to?: any, from?: any) => {
  if (!to && !from) {
    const date = new Date();
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const monthDate = date.getMonth() + 1;
    const formattedMonthDate = monthDate < 10 ? `0${monthDate}` : monthDate;
    from = `${date.getFullYear()}${formattedMonthDate}01`;
    to = `${date.getFullYear()}${formattedMonthDate}${lastDayOfMonth.getDate()}`;
  }
  const res = await fetch(
    `${HARVEST_BASE_URL}/reports/time/clients?from=${from}&to=${to}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
        "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
        "User-Agent": "Robo House (kevin@robo-house.com)",
      },
    }
  );
  return await res.json();
};
