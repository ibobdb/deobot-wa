const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  try {
    if (!token) {
      return res.status(401).json({ message: 'Access Denied, No Token Provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
}
const bot_token = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  try {
    if (!token) {
      return res.status(401).json({ message: 'Access Denied, No Token Provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
}
module.exports = { auth, bot_token }