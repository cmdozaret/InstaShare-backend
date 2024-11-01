exports.loadModels = function loadModels() {
    require('./models/file').loadModel();
}

exports.setRoutes = function setRoutes(app) {
    require('./routes/collection').routes(app);
}
