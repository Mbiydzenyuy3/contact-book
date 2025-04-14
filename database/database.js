//database.mjs
import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      // console.log("Connected to database");
    } catch (err) {
      console.error(" Database connection error:", err);
      throw err;
    }
  }
};

process.on("SIGINT", async () => {
  await client.end();
  console.log(" Database connection closed");
  process.exit(0);
});

export { client, connectToDatabase };
