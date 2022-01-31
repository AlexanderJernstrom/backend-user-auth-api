import pg from "pg";
const { Client } = pg;

export const initDB = async ({ user, host, database, password, port }) => {
  try {
    const client = new Client({ user, host, database, password, port });
    return client;
  } catch (error) {
    throw new Error(error);
  }
};
