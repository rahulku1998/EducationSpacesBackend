const express = require("express");
const router = express.Router();

const videoController = require("../controllers/videoController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

// 🔓 Public
router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);

// 🔒 Admin Only
router.post("/", protect, isAdmin, videoController.createVideo);
router.put("/:id", protect, isAdmin, videoController.updateVideo);
router.delete("/:id", protect, isAdmin, videoController.deleteVideo);

module.exports = router;
