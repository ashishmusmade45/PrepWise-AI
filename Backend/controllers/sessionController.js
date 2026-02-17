const Session = require("../models/session");
const Question = require("../models/question");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { questionAnswerPrompt } = require("../utils/prompts");

//@desc  Create new session and linked questions
//@route Post/api/session/create
//@acess Private
const createSession = async (req, res) => {
    try {
        const { role, experience, topicToFocus, description } = req.body;
        // First, create the session without questions
        const session = await Session.create({
            user: req.user._id,
            role,
            experience,
            topicToFocus,
            description,
            questions: []
        });

        // Generate questions using AI
        const prompt = questionAnswerPrompt(role, experience, topicToFocus, 5); // 5 questions by default
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const result = await model.generateContent(prompt);
        const responseAI = await result.response;
        let rawText = responseAI.text();
        let jsonMatch = rawText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            jsonMatch = rawText.match(/\{[\s\S]*\}/);
        }
        let questionsData = [];
        if (jsonMatch) {
            const jsonString = jsonMatch[0];
            questionsData = JSON.parse(jsonString);
        }

        // Save questions and link to session
        const questionDocs = await Promise.all(
            (questionsData || []).map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                    note: q.note || '',
                    isPinned: q.isPinned || false
                });
                return question._id;
            })
        );
        session.questions = questionDocs;
        await session.save();

        // Populate questions before sending response
        const populatedSession = await Session.findById(session._id).populate({
            path: 'questions',
            options: { sort: { createdAt: -1 } }
        });

        res.status(201).json(populatedSession);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//@desc  Get all sessions foe logged in user
//@route Post/api/  
//@acess Private
const getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: 'questions',
                options: { sort: { createdAt: -1 } }
            });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//@desc  Get a session bt id with populated questions
//@route Post/api/session/:id
//@acess Private
const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate({
            path: 'questions',
            options: { sort: { createdAt: -1 } }
        });
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        if (session.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//@desc  Delete session by id and its questions
//@route Post/api/session/:id
//@acess Private
const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        if (session.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        // Delete all questions linked to this session
        await Question.deleteMany({ session: session._id });
        await session.deleteOne();
        res.status(200).json({ message: "Session and its questions deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get all sessions (public)
const getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find()
            .sort({ createdAt: -1 })
            .populate({
                path: 'questions',
                options: { sort: { createdAt: -1 } }
            });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { createSession, getSessionById, getMySessions, deleteSession, getAllSessions };