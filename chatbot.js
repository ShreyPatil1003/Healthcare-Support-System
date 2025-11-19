const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = 'AIzaSyB0Pmk6o5m_Z-xDGYUZFl9VK3hQCkNJai0'; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro'
});

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const result = await model.generateContent(userMessage);
        const text = result.response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error while generating response" });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
