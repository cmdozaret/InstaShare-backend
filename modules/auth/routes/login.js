const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const env = require('../../../config/env');
const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
    try {
        const user = await models.User.scope('withPassword').findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) {
            const error = new Error();
            error.status = 404;
            error.message = 'User not found';
            throw error;
        }
        // Checking password
        if (await bcrypt.compare(req.body.password, user.password)) {
            const userInfo = {
                id: user.id,
                username: user.username,
                email: user.email,
            };

            // Generating access token
            const accessSecret = env.get('jwt:secretToken');
            const accessToken = jwt.sign(userInfo, accessSecret, { expiresIn: '30m' });

            // Generating refresh token
            const refreshSecret = env.get('jwt:refreshToken');
            const refreshToken = jwt.sign(userInfo, refreshSecret);
            user.refreshToken = refreshToken;
            user.save();

            let responseObj = require('../../../common/dataStructure/response');
            responseObj.success = true;
            responseObj.data = {
                accessToken,
                refreshToken,
                user: userInfo
            };
            responseObj.message = "Login successfully";
            responseObj.status = 200;

            // Returning tokens
            return res.status(200).json(responseObj);
        }
        else {
            const error = new Error();
            error.status = 401;
            error.message = 'Wrong password';
            throw error;
        }
    }
    catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "An error has occur in login process"
        });
    }
}