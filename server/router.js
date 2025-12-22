import express from "express";
import { getAll } from "./services/getAll.service.js";
import { newCost } from "./services/newCost.service.js";

const router = express.Router();

router.get("/get-all", (req, res) => {
  getAll(req, res);
});

router.post("/new", (req, res) => {
  newCost(req, res);
});

export default router;
