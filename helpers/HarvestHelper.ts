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

export const createHarvestClient = async (company: string, address: string) => {
  const res = await fetch(`${HARVEST_BASE_URL}/clients`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
      "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
      "User-Agent": "Robo House (kevin@robo-house.com)",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: company, address, currency: "USD" }),
  });
  return await res.json();
};

export const getAllHarevestProjects = async () => {
  const res = await fetch(`${HARVEST_BASE_URL}/projects`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
      "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
      "User-Agent": "Robo House (kevin@robo-house.com)",
    },
  });
  return await res.json();
};

export const getHarvestProjectsForClient = async (cliendId: number) => {
  const res = await fetch(
    `${HARVEST_BASE_URL}/projects?client_id=${cliendId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
        "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
        "User-Agent": "Robo House (kevin@robo-house.com)",
      },
    }
  );
  const { projects } = await res.json();
  return projects;
};

export const getHarvestTimeSheetsForProject = async (projectId: number) => {
  const res = await fetch(
    `${HARVEST_BASE_URL}/time_entries?project_id=${projectId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
        "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
        "User-Agent": "Robo House (kevin@robo-house.com)",
      },
    }
  );
  const { time_entries } = await res.json();
  return time_entries;
};

export const getHarvestTimeSheetsForClient = async (clientId: number) => {
  const res = await fetch(
    `${HARVEST_BASE_URL}/time_entries?client_id=${clientId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
        "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
        "User-Agent": "Robo House (kevin@robo-house.com)",
      },
    }
  );
  const { time_entries } = await res.json();
  return time_entries;
};

export const createProjectForClient = async (
  clientId: number,
  name: string,
  startsOn: Date,
  endsOn: Date,
  budget: number
) => {
  const res = await fetch(`${HARVEST_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
      "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
      "User-Agent": "Robo House (kevin@robo-house.com)",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      name,
      budget,
      is_billable: true,
      bill_by: "Task",
      budget_by: "project",
      starts_on: new Date(startsOn),
      ends_on: new Date(endsOn),
    }),
  });
  return await res.json();
};

export const getHarvestInvoicesForClient = async (cliendId: number) => {
  const res = await fetch(
    `${HARVEST_BASE_URL}/invoices?client_id=${cliendId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
        "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID || "",
        "User-Agent": "Robo House (kevin@robo-house.com)",
      },
    }
  );
  return await res.json();
};
