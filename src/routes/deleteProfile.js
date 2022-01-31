import { deleteUser } from "../controllers/deleteUser.js";

export const deleteAccount = async (req, res) => {
  const { user } = req;

  try {
    const result = await deleteUser(user.id);
    return res
      .status(200)
      .json({ message: "Account was deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Could not delete profile",
    });
  }
};
