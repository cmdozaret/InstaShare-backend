const { sequelize } = require('../../../common/db');
const { models } = sequelize;

exports.routes = function routes(app) {
    const userCollectionRoute = `/user`;

    app
        .route(userCollectionRoute)
        .post(require('./create.js'))
        .get(require('./index.js'))

    const userSingleRoute = `${userCollectionRoute}/:userId`;

    async function ensureUserId(req, res, next) {
        const userId = req.params.userId || -1
        try {
            const user = await models.User.findByPk(userId, {
                include: [
                    {
                        all: true,
                    },
                ],
            })
            if (!user) {
                const e = new Error(`User not found`);
                e.status = 404;
                throw e;
            }
            req.user = user;
            return next();
        } catch (error) {
            return res.status(error.status || 500).json({
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }

    app
        .route(userSingleRoute)
        .patch(ensureUserId, require('./update.js'))
        .get(ensureUserId, require('./show.js'))
        .delete(ensureUserId, require('./delete.js'))
}