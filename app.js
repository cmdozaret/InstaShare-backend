const express = require('express');
const app = new express();

const env = require('./config/env/index');
console.log(env.get("APIName"));

app.listen(3500);