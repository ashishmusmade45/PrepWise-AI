const Session = require("../models/session");
const Question = require("../models/question");
const question = require("../models/question");

//@desc  Add additional questions to existing sesssion
//@route Post/api/questions/add
//@acess Private
exports.addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;
        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(400).json({ message: "Session not found" });
        }
        // Create new questions
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
                note: q.note || '',
                isPinned: q.isPinned || false,
            }))
        );
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();
        res.status(201).json(createdQuestions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//@desc  Pin or unpin a question
//@route Post/api/questions/:id/pin
//@acess Private
exports.togglePinQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        // Optionally, check if the user owns the session/question here
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({ message: `Question ${question.isPinned ? 'pinned' : 'unpinned'}`, question });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//@desc  Update note for a question
//@route Post/api/questions/:id/note
//@acess Private
exports.updateQuestionNote = async (req, res) => {
    try {
        if (!req.body || typeof req.body.note !== 'string') {
            return res.status(400).json({ message: "Invalid note" });
        }
        const questionId = req.params.id;
        const { note } = req.body;
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        // Optionally, check if the user owns the session/question here
        question.note = note;
        await question.save();
        res.status(200).json({ message: "Note updated", question });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



