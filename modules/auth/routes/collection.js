exports.routes = function routes(app) {
    const authCollectionRoute = `/auth`;
    const loginRoute = `${authCollectionRoute}/login`;

    app
        .route(loginRoute)
        .post(require('./login.js'))
}