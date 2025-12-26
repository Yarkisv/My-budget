import express from "express";
import { getAll } from "./services/getAll.service.js";
import { newCost } from "./services/newCost.service.js";
import { newIncoming } from "./services/newIncoming.service.js";
import { getWishlistItems } from "./services/getWishlistItems.service.js";
import { removeWishlistItem } from "./services/removeWishlistItem.service.js";
import { updateWishlistItemStatus } from "./services/updateWishlistItemStatus.service.js";
import { getAllTransactionsByMonth } from "./services/getAllTransactionsByMonth.service.js";
import { getMonthStatistics } from "./services/getMonthStatistics.service.js";

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

router.get("/get-wishlist-items", (req, res) => {
  getWishlistItems(req, res);
});

router.delete("/remove-wishlist-item/:id", (req, res) => {
  removeWishlistItem(req, res);
});

router.put("/update-wishlist-item-status/:id", (req, res) => {
  updateWishlistItemStatus(req, res);
});

router.get("/all-transactions-by-month", (req, res) => {
  getAllTransactionsByMonth(req, res);
});

router.get("/month-statistics/:period", (req, res) => {
  getMonthStatistics(req, res);
});

export default router;
