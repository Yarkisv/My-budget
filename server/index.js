import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router.js";

dotenv.config({ quiet: true });

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(7000, "0.0.0.0", () => {
  console.log("Server running on port 7000");
});
