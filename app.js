const express = require('express');
const app = new express();

// loading Db configuration
const db = require('./common/db');

app.listen(3500);