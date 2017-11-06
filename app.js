// imports
const express = require('express');
const logger = require('morgan')('dev');
const path = require('path');

// app vars
const app = express();

const public = path.join(__dirname, 'public');
const index = path.join(public, 'index.html');

app.use(logger);
app.use('/public', express.static(public));
app.get('/', (req, res) => res.sendFile(index));

module.exports = app;
