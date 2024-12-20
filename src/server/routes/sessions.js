import express from 'express';
import { Session } from '../models/Session.js';

const router = express.Router();

// POST /api/sessions
router.post('/', async (req, res) => {
  try {
    const session = new Session({
      sessionId: req.body.sessionId,
      messages: []
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// GET /api/sessions/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// POST /api/sessions/:sessionId/messages
router.post('/:sessionId/messages', async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.messages.push({
      content: req.body.content,
      sender: req.body.sender
    });
    session.lastActive = new Date();
    await session.save();
    
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add message' });
  }
});

export default router;