const express = require('express');
const router = express.Router();
const { CreateUser, Login } = require('./services');
router.post('/login', async (req, res) => {
  const response = await Login(req.body);
  res.json(response);
});
router.post('/create', async (req, res) => {
  const response = await CreateUser(req.body);
  res.json(response);
});
module.exports = router