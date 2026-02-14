const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");
const {
  getAllWhatsNew,
  createWhatsNew,deleteWhatsNew,updateWhatsNew
} = require("../controllers/whatsNewController");

// GET all items
router.get("/", getAllWhatsNew);

// POST new item
router.post("/", protect, isAdmin, createWhatsNew);
router.delete("/:id", protect, isAdmin, deleteWhatsNew);
router.put("/:id", protect, isAdmin, updateWhatsNew);

module.exports = router;
