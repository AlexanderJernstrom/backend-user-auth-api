import { client } from "../index.js";

export const searchUsers = async (query) => {
  try {
    const results = await client.query(
      "select * from users where to_tsvector(name) @@ to_tsquery('english', $1)",
      [query]
    );
    return results.rows;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};
