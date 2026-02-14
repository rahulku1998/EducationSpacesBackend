const mongoose = require("mongoose");

const whatsNewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // 👈 correct place
  }
});

module.exports = mongoose.model("WhatsNew", whatsNewSchema);
