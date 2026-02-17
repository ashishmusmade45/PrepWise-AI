const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");
const Question = require("../models/question");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//@desc  Generate interview questions and answer using Gemini
//@route Post/api/ai/generate-questions
//@acess Private
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicToFocus, numberOfQuestions);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let rawText = response.text();

        // Extract JSON from the response
        let jsonMatch = rawText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            // Try to find JSON object if array not found
            jsonMatch = rawText.match(/\{[\s\S]*\}/);
        }

        if (!jsonMatch) {
            throw new Error("No valid JSON found in AI response");
        }

        const jsonString = jsonMatch[0];
        const data = JSON.parse(jsonString);

        res.status(200).json(data);

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};

//@desc  Generate explains a interview question
//@route Post/api/ai/generate-explanation
//@acess Private
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const prompt = conceptExplainPrompt(question);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let rawText = response.text();

        // Extract JSON from the response
        let jsonMatch = rawText.match(/\{[\s\S]*\}/);
        
        if (!jsonMatch) {
            throw new Error("No valid JSON found in AI response");
        }

        const jsonString = jsonMatch[0];
        const data = JSON.parse(jsonString);

        res.status(200).json(data);

    } catch (error) {
        console.error("AI Explanation Error:", error);
        res.status(500).json({
            message: "Failed to generate explanation",
            error: error.message,
        });
    }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };