const Vacancy = require("../models/Vacancy");

// GET all vacancies
exports.getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find().sort({ createdAt: -1 });
    res.status(200).json(vacancies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE vacancy
exports.createVacancy = async (req, res) => {
  try {
    const newVacancy = new Vacancy(req.body);
    const savedVacancy = await newVacancy.save();
    res.status(201).json(savedVacancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE vacancy
exports.updateVacancy = async (req, res) => {
  try {
    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedVacancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE vacancy
exports.deleteVacancy = async (req, res) => {
  try {
    await Vacancy.findByIdAndDelete(req.params.id);
    res.json({ message: "Vacancy deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
