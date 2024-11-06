const jwt = require('jsonwebtoken');

const env = require('../../../config/env');
const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
    try {
        // Getting the token from the header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({
                "message": "Must login first",
            });
        }
        const [, token] = authHeader.split(' ');
        if (!token) {
            return res.status(401).json({
                "message": "Must login first",
            });
        }

        // Verifying the token
        const secret = env.get('jwt:secretToken');
        jwt.verify(token, secret, async (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    "message": "Access denied 1",
                });
            };
            const user = await models.User.scope('withRefreshToken').findByPk(decoded.id);
            if (!user) {
                return res.status(404).json({
                    "message": "User not found",
                });
            }
            if (req.loggedUser.id !== user.id) {
                return res.status(403).json({
                    "message": "Access denied 2",
                });
            }
            user.refreshToken = null;
            user.save();
            let responseObj = require('../../../common/dataStructure/response');
            responseObj.success = true;
            responseObj.message = "Logged out successfuly";
            return res.status(200).json(responseObj);
        });
    }
    catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "An error has occur in login process"
        });
    }
}