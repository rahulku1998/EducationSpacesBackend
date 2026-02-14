const Contact = require("../models/Contact");

// SAVE contact/news
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, news } = req.body;

    if (!name || !email || !phone || !news) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      news,
    });

    res.status(201).json({
      message: "News submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
