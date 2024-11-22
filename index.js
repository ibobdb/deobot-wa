const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const conn = require('./config');
const PORT = 8080;
require('dotenv').config();
conn();
app.use(bodyParser.json());
app.use(express.json());
const user = require('./Users/routers');
const bot = require('./Bot/router');
app.use('/client', bot);
app.use('/user', user)
app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`)
})