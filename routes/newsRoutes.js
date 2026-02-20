const express = require("express");
const router = express.Router();
const {getNewsPreview}=require("../controllers/newsController");

const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");


// ===============================
// PUBLIC ROUTES
// ===============================

// Anyone can view news
router.get("/", getAllNews);


router.get("/preview/:id", getNewsPreview);

router.get("/:id", getNewsById);



// ===============================
// ADMIN ROUTES
// ===============================

// Create news (Admin only)
router.post("/", protect, isAdmin, createNews);

// Update news (Admin only)
router.put("/:id", protect, isAdmin, updateNews);

// Delete news (Admin only)
router.delete("/:id", protect, isAdmin, deleteNews);


module.exports = router;
