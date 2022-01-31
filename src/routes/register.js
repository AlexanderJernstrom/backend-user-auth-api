import bcryptjs from "bcryptjs";
import { createUser } from "../controllers/createUser.js";
import { getUserByEmail } from "../controllers/getUserByEmail.js";
const { hashSync } = bcryptjs;

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = hashSync(password, 8);
  const userWithEmailExists = await getUserByEmail(email);
  console.log(userWithEmailExists);
  if (userWithEmailExists) {
    return res
      .status(500)
      .json({ message: "User with this email already exists" });
  }

  const newUser = await createUser({ name, email, password: hashedPassword });
  res.json({ user: newUser });
};
