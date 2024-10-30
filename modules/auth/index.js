exports.setRoutes = function setRoutes(app) {
    require('./routes/collection').routes(app);
}
