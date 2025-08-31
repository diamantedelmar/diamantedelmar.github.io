// server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

// Use environment variables for the API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable is not set.');
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 8080; // DigitalOcean uses port 8080 by default

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Serve static files (your index.html, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API endpoint to handle AI requests
app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to get response from AI.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});