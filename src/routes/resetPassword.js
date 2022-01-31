import { getUserById } from "../controllers/getUserById.js";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import { updateUserPassword } from "../controllers/updateUserPassword.js";

export const sendResetPasswordEmail = async (req, res) => {
  const { id } = req.user;

  const user = await getUserById(id);
  try {
    const resetPasswordToken = await jwt.sign({ id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailInformation = await transporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to: user.email,
      subject: "Reset Password",
      html: `<h1>Reset Password</h1><p>Click on the link below to reset your password</p><a href="${resetPasswordLink}">Reset Password</a>`,
    });
    return res.status(200).json({ success: true, email: emailInformation });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;
  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    console.log(id);
    const user = await getUserById(id);
    const hashedPassword = await hash(newPassword, 10);
    const result = await updateUserPassword(hashedPassword, id);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
