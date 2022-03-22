const express = require('express');
const path = require('path');

const api = express();

api.use(express.static(path.join(__dirname, 'public')));

api.use('/', express.static('index.html'));


const publicDirPath = path.join(__dirname, '../public');
api.use(express.static(publicDirPath));

module.exports = api;