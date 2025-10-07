const Message = require('../models/Message');

exports.sendMessage = async (req, res, next) => {
  try {
    const { content, teamId } = req.body;
    if (!content || !teamId) return res.status(400).json({ error: 'content and teamId required' });
    const msg = await Message.create({
      content,
      senderId: req.user._id,
      teamId,
    });
    // Note: emitting to sockets should be done in route or with IoC - keep simple here
    res.status(201).json(msg);
  } catch (err) { next(err); }
};

exports.getMessages = async (req, res, next) => {
  try {
    const teamId = req.query.teamId;
    if (!teamId) return res.status(400).json({ error: 'teamId required' });
    const messages = await Message.find({ teamId }).sort({ timestamp: 1 }).limit(500);
    res.json(messages);
  } catch (err) { next(err); }
};
