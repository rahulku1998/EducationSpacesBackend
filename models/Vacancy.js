const mongoose = require("mongoose");

const VacancySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: String,
    slug: { type: String, required: true, unique: true },

    status: {
      type: String,
      enum: ["active", "upcoming"],
      default: "upcoming",
    },

    startDate: String,
    lastDate: String,
    ageLimit: String,

    eligibility: String,
    howToApply: String,
    TotalPost: Number,

    description: {
      hi: String,
      en: String,
    },
    syllabusLink: String,
    previousYearPaperLink: String,
    TopperTalkLink: String,
    
    detailsLink: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vacancy", VacancySchema);
