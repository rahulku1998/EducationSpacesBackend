const News = require("../models/News");


// ===============================
// GET ALL NEWS
// ===============================
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.error("Get All News Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ===============================
// GET SINGLE NEWS
// ===============================
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Get News By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.getNewsPreview = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).send("News not found");
    }

    const newsUrl = `https://educationspaces.in/news/${news._id}`;

    const esc = (str = "") =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    // ✅ Crawler ke liye OG tags
    // ✅ User ke liye seedha 302 redirect — Render ka oref nahi aayega
    const isBot = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|crawler|bot/i.test(
      req.headers["user-agent"] || ""
    );

    if (isBot) {
      // Crawler ko OG tags wala HTML do
      const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${esc(news.title)}</title>
    <meta property="og:title" content="${esc(news.title)}" />
    <meta property="og:description" content="${esc(news.summary)}" />
    <meta property="og:image" content="${esc(news.photo)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${newsUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Education Spaces" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(news.title)}" />
    <meta name="twitter:description" content="${esc(news.summary)}" />
    <meta name="twitter:image" content="${esc(news.photo)}" />
  </head>
  <body></body>
</html>`;
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(html);
    } else {
      // Normal user ko seedha redirect karo — 302 se
      res.redirect(302, newsUrl);
    }

  } catch (error) {
    console.error("Preview Error:", error);
    res.status(500).send("Server Error");
  }
};










// ===============================
// CREATE NEWS
// ===============================
exports.createNews = async (req, res) => {
  try {
    const { title, summary, fullContent, photo, } = req.body;

    if (!title || !summary || !fullContent || !photo) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newNews = await News.create({
      title,
      summary,
      fullContent,
      photo,
    });

    res.status(201).json({
      success: true,
      message: "News created successfully",
      data: newNews,
    });
  } catch (error) {
    console.error("Create News Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ===============================
// UPDATE NEWS
// ===============================
exports.updateNews = async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      data: updatedNews,
    });
  } catch (error) {
    console.error("Update News Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ===============================
// DELETE NEWS
// ===============================
exports.deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);

    if (!deletedNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Delete News Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
