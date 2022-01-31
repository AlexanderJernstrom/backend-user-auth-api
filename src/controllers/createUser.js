import { client } from "../index.js";

export const createUser = async ({ name, email, password }) => {
  try {
    const newUser = await client.query(
      "insert into users (name, email, password) values ($1, $2, $3) returning *",
      [name, email, password]
    );
    return newUser.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};
