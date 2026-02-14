const WhatsNew = require("../models/whatsNew");

// GET all WhatsNew items
exports.getAllWhatsNew = async (req, res) => {
  try {
    const items = await WhatsNew.find().select("title link createdAt");
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ADD a new WhatsNew item (admin)
exports.createWhatsNew = async (req, res) => {
  try {
    const item = await WhatsNew.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteWhatsNew = async (req, res) => {
  try {
    const item = await WhatsNew.findByIdAndDelete(req.params.id); 
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateWhatsNew = async (req, res) => {
  try {
    const item = await WhatsNew.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};