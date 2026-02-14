const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    vacancyTitle: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    resultDate: {
      type: String,
      
    },
    status: {
      type: String,
      enum: ["declared", "upcoming"],
      required: true,
    },
    links: [
      {
        title: {
          type: String,
         
        },
        url: {
          type: String,
         
        }
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
