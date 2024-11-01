const jwt = require('jsonwebtoken');

const env = require('../../../config/env');
const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            const error = new Error();
            error.status = 401;
            error.message = "Refresh token required";
            throw error;
        }
        const validUser = await models.User.findOne({
            where: {
                refreshToken
            },
        });
        if (!validUser) {
            const error = new Error();
            error.status = 403;
            error.message = "You can not refresh token for that user";
            throw error;
        }

        // Verifiyng the token
        jwt.verify(refreshToken, env.get('jwt:refreshToken'), (error, decoded) => {
            if (error) {
                throw error;
            }
            if (decoded.id !== validUser.id) {
                const err = new Error();
                err.message = "Invalid refresh token provided";
                err.status = 403;
                throw err;
            }

            // Generating access token
            const userInfo = {
                id: validUser.id,
                username: validUser.username,
                email: validUser.email,
            };
            const accessSecret = env.get('jwt:secretToken');
            const accessToken = jwt.sign(userInfo, accessSecret, { expiresIn: '30m' });

            // Returning new access token
            return res.status(200).json({
                accessToken,
            });
        });
    }
    catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error refreshing token',
        })
    }
}