import { client } from "../index.js";

export const updateUserPassword = async (newPassword, userId) => {
  console.log(newPassword);
  try {
    const result = await client.query(
      `update users set password = $1 where id = $2 returning id`,
      [newPassword, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};
