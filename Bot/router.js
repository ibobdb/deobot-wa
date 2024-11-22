const express = require('express');
const router = express.Router();
const { sendMessage } = require('./services');
const { bot_token } = require('../middleware');
router.post('/send_message', bot_token, async (req, res) => {
  const response = await sendMessage(req.body);
  res.json(response)
})
module.exports = router