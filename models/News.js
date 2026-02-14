const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    fullContent: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // image URL
      required: true,
    },
    video:{
      type:String
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
