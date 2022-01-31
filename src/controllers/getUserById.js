import { client } from "../index.js";

export const getUserById = async (id) => {
  try {
    const user = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};
