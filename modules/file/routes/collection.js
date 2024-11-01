const multer = require('multer');

const { sequelize } = require('../../../common/db/index.js');
const { models } = sequelize;
const { authUser } = require('../../../common/middleware/authenticate.js');

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.routes = function routes(app) {
    const fileCollectionRoute = `/file`;

    app
        .route(fileCollectionRoute)
        .post(authUser, upload.single('file'), require('./create.js'))
        .get(authUser, require('./index.js'))

    const fileSingleRoute = `${fileCollectionRoute}/:fileId`;

    async function ensureFileId(req, res, next) {
        const fileId = req.params.fileId || -1
        try {
            const file = await models.File.findByPk(fileId, {
                include: [
                    {
                        all: true,
                    },
                ],
            })
            if (!file) {
                const e = new Error(`File not found`);
                e.status = 404;
                throw e;
            }
            if (file.UserId !== req.loggedUser.id) {
                const error = new Error();
                error.status = 403;
                error.message = 'That file is not yours';
                throw error;
            }
            req.file = file;
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
        .route(fileSingleRoute)
        .patch(authUser, ensureFileId, require('./update.js'))
        .get(authUser, ensureFileId, require('./show.js'))
        .delete(authUser, ensureFileId, require('./delete.js'))
}