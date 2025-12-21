import express from "express";
import { getAll } from "./services/getAll.service.js";

const router = express.Router();

router.get("/get-all", (req, res) => {
  getAll(req, res);
});

export default router;
