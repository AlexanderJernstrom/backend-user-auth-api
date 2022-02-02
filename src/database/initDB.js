import pg from "pg";
const { Client } = pg;

export const initDB = async (connectionString) => {
  try {
    const client = new Client({ connectionString, ssl: true });
    return client;
  } catch (error) {
    throw new Error(error);
  }
};
