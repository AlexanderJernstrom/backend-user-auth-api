import express from "express";
import cors from "cors";
import { initDB } from "./database/initDB.js";
import { config } from "dotenv";
import { register } from "./routes/register.js";
import { login } from "./routes/login.js";
import { auth } from "./middlewares/auth.js";
import { profile } from "./routes/profile.js";
import { userSearch } from "./routes/userSearch.js";
import { deleteAccount } from "./routes/deleteProfile.js";
import {
  resetPassword,
  sendResetPasswordEmail,
} from "./routes/resetPassword.js";

export let client;
config();

const databaseENVs = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const init = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  client = await initDB(databaseENVs);
  await client.connect();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/register", register);

  app.post("/login", login);

  app.get("/profile", auth, profile);

  app.get("/users/search", auth, userSearch);

  app.delete("/user/delete", auth, deleteAccount);

  app.post("/send-reset-password-email", auth, sendResetPasswordEmail);

  app.post("/update-password", auth, resetPassword);

  app.listen(process.env.PORT || 5000, () =>
    console.log("Server started on port 5000")
  );
};

init();
