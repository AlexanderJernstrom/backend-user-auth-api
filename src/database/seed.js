import { initDB } from "./initDB.js";
import { users } from "./mockusers.js";
import { config } from "dotenv";
config();

const seed = async () => {
  const databaseENVs = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  };
  const client = await initDB(databaseENVs);
  await client.connect();
  try {
    for (const user of users) {
      await client
        .query(
          "insert into users (name, email, password) values ($1, $2, $3) returning *",
          [user.name, user.email, user.password]
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    console.log("Succesfully seeded database");
  } catch (err) {
    console.log(new Error(err.message));
  }
};

seed();
