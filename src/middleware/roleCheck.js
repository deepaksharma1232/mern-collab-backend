const User = require('../models/User');

module.exports = (allowedRoles = []) => async (req, res, next) => {
  try {
    const email = req.firebaseUser && req.firebaseUser.email;
    if (!email) return res.status(401).json({ error: 'No user email' });
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: 'User not registered on server' });
    if (!allowedRoles.includes(user.role)) return res.status(403).json({ error: 'Insufficient permissions' });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
