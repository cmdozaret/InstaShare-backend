const { authUser } = require('../../../common/middleware/authenticate.js');

exports.routes = function routes(app) {
    const authCollectionRoute = `/auth`;
    const loginRoute = `${authCollectionRoute}/login`;

    app
        .route(loginRoute)
        .post(require('./login.js'));

    const refreshTokenRoute = `${authCollectionRoute}/refresh-token`;
    app
        .route(refreshTokenRoute)
        .post(require('./refresh-token.js'));

    const logoutRoute = `${authCollectionRoute}/logout`;
    app
        .route(logoutRoute)
        .delete(authUser, require('./logout.js'));
}