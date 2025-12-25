import express from "express";
import { getAll } from "./services/getAll.service.js";
import { newCost } from "./services/newCost.service.js";
import { newIncoming } from "./services/newIncoming.service.js";

const router = express.Router();

router.get("/get-all", (req, res) => {
  getAll(req, res);
});

router.post("/new", (req, res) => {
  newCost(req, res);
});

router.post("/new-incoming", (req, res) => {
  newIncoming(req, res);
});

export default router;
