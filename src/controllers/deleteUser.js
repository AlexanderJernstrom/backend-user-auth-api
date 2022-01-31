import { client } from "../index.js";

export const deleteUser = async (userId) => {
  try {
    const result = await client.query(
      "delete from users where id = $1 returning id",
      [userId]
    );
    return result;
  } catch (error) {
    return new Error(error);
  }
};
