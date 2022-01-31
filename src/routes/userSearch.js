import { searchUsers } from "../controllers/searchUsers.js";

export const userSearch = async (req, res) => {
  const searchQuery = req.query.search;

  const users = await searchUsers(searchQuery);

  res.status(200).json(users);
};
