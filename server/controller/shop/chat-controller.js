const express = require("express");
const axios = require("axios");
require("dotenv").config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Ensure this is correct

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Use the correct model name
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GOOGLE_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ reply });
  } catch (error) {
    console.error(
      "Google Gemini API Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { sendMessage };
