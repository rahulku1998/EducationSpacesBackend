const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

// CREATE
router.post("/", protect, isAdmin, resultController.createResult);

// READ
router.get("/", resultController.getResults);

// UPDATE
router.put("/:id", protect, isAdmin, resultController.updateResult);

// DELETE
router.delete("/:id", protect, isAdmin, resultController.deleteResult);

module.exports = router;
