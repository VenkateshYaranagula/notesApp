const express = require('express');
const { Note, Tag } = require('../models');
const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create Note
router.post('/notes', authenticate, async (req, res) => {
  const { title, content, color, tags } = req.body;
  try {
    const note = await Note.create({ title, content, color, userId: req.user.userId });
    if (tags) {
      await Promise.all(tags.map(tag => Tag.create({ name: tag, noteId: note.id })));
    }
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch Notes
router.get('/notes', authenticate, async (req, res) => {
  const notes = await Note.findAll({ where: { userId: req.user.userId }, include: Tag });
  res.json(notes);
});

module.exports = router;