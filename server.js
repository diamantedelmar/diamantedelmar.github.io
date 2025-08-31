const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

// IMPORTANT: This line is for local development with a .env file.
// DigitalOcean App Platform handles environment variables directly.
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Access the API key from the environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable is not set. Please set it in your DigitalOcean App Platform dashboard.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Middleware to parse JSON bodies
app.use(express.json());

// Explicitly serve index_en.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index_en.html'));
});

// Serve the static files from the 'public' directory for all other assets
app.use(express.static(path.join(__dirname, 'public')));


// API endpoint to handle all AI requests
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt, useWebSearch } = req.body;
        
        // Correct model for generateContent with tools
        let modelName = "gemini-2.5-flash-preview-05-20";
        let generationConfig = {};
        let tools = [];

        if (useWebSearch) {
            // Enable web search grounding for more up-to-date information
            tools.push({ "google_search": {} });
        }

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            tools: tools
        };
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("Gemini API Error:", errorBody);
            res.status(response.status).json({ error: errorBody.error.message });
            return;
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
        
        res.json({ text });

    } catch (error) {
        console.error('Server-side Error:', error);
        res.status(500).json({ error: 'An unexpected server error occurred.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
