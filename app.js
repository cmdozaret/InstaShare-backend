const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const env = require('./config/env/index');

// parse application/json
app.use(bodyParser.json());

// loading Db configuration
const db = require('./common/db');
// loading Db models
db.loadModels();

// loading models routes
const routes = require('./src/routes');
routes.setRoutes(app);

app.listen(env.get('port'));