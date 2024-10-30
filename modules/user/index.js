exports.loadModels = function loadModels() {
    require('./models/user').loadModel();
}

exports.setRoutes = function setRoutes(app) {
    require('./routes/collection').routes(app);
}
