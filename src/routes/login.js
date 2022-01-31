import bcryptjs from "bcryptjs";
const { compare } = bcryptjs;
import { getUserByEmail } from "../controllers/getUserByEmail.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res
      .status(500)
      .json({ message: "User with this email does not exist" });
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(500).json({ message: "Password doesn't match the user" });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET);
  user.token = token;

  return res.json(user);
};
