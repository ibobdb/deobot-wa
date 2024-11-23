const express = require('express');
const router = express.Router();
const { sendMessage } = require('./services');
const { bot_token } = require('../middleware');
const { Grafana } = require('../Platform/Grafana');
router.post('/send_message', bot_token, async (req, res) => {
  // return res.json(res.body)
  const externalRules = req.query.externalRules || false;
  const source = req.query.source;
  const to = req.query.to;
  const isGroup = req.query.isGroup;
  var data = req.body;

  if (externalRules) {
    if (source == "grafana") {
      // jalankan query grafana
      const response = await Grafana(data, to, isGroup);
      data = response;
    } else {
      console.log('Ini platform lain');
    }
  } else {
    console.log('kategori lain');
  }
  const response = await sendMessage(data);
  res.json(response)
})
// router.post('/send_message_grafana',bot_token)
module.exports = router