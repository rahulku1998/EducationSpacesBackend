const express = require("express");
const router = express.Router();
const Vacancy = require("../models/Vacancy");
const vacancyController = require("../controllers/vacancyController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

// 🔹 PUBLIC ROUTES
// GET all vacancies
router.get("/", vacancyController.getAllVacancies);

// GET vacancy by slug
router.get("/:slug", async (req, res) => {
  try {
    const vacancy = await Vacancy.findOne({ slug: req.params.slug });
    if (!vacancy) return res.status(404).json({ message: "Vacancy not found" });
    res.json(vacancy);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 ADMIN ROUTES (protected + admin only)
// CREATE vacancy
router.post("/", protect, isAdmin, vacancyController.createVacancy);

// UPDATE vacancy
router.put("/:id", protect, isAdmin, vacancyController.updateVacancy);

// DELETE vacancy
router.delete("/:id", protect, isAdmin, vacancyController.deleteVacancy);

module.exports = router;
