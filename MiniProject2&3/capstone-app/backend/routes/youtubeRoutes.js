const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = process.env.YOUTUBE_API_KEY; // Store your API key in environment variables

router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: query,
          maxResults: 5,
          type: "video",
          key: API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching YouTube videos" });
  }
});

module.exports = router;