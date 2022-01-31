import { getUserById } from "../controllers/getUserById.js";

export const profile = async (req, res) => {
  const { user } = req;

  try {
    const profile = await getUserById(user.id);
    if (!profile) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    profile.password = undefined;
    return res.json(profile);
  } catch (error) {
    throw new Error(error);
  }
};
