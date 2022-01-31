import { client } from "../index.js";

export const getUserByEmail = async (email) => {
  try {
    const result = await client.query(
      `
            SELECT * FROM users WHERE email = $1
        `,
      [email]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};
