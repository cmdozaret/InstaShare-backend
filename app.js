const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const env = require('./config/env/index');
const portNumber = env.get('port');

const app = new express();

// parse application/json
app.use(bodyParser.json());

app.use(
    cors({
        maxAge: 604800000,
        credentials: true,
        origin(origin, callback) {
            let corsOptions = {};
            let error = null;
            const allowlist = env.get('cookie:allowedOrigins');
            if (
                allowlist.indexOf(origin) != -1 ||
                origin == undefined ||
                origin == 'null'
            ) {
                corsOptions = {
                    origin: true,
                }
            } else {
                error = `Origin \`${origin}\` no permitido.`
                corsOptions = {
                    origin: false,
                }
            }
            callback(error, corsOptions)
        },
    })
)

// loading Db configuration
const db = require('./common/db');
// loading Db models
db.loadModels();

// loading models routes
const routes = require('./src/routes');
routes.setRoutes(app);

app.listen(portNumber, () => {
    console.log(`Server running on port: ${portNumber}`)
});

module.exports = app;