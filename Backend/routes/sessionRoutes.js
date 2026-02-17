const express = require('express');
const { createSession, getSessionById, getMySessions, deleteSession, getAllSessions } = require('../controllers/sessionController');
const { protect } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.get('/', getAllSessions); // Public GET /api/sessions
router.post('/create', protect, createSession);
router.get('/my-session', protect, getMySessions);
router.get('/:id', protect, getSessionById);
router.delete('/:id', protect, deleteSession);

module.exports = router;