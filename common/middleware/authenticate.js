const jwt = require('jsonwebtoken');
const env = require('../../config/env');

const { sequelize } = require('../db');
const { models } = sequelize;

async function authUser(req, res, next) {
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
                return res.status(403).send("Access denied")
            };
            const user = await models.User.findByPk(decoded.id);
            if (!user) {
                return res.status(404).json({
                    "message": "User not found",
                });
            }
            req.loggedUser = user;
            next();
        });
    }
    catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error authenticating user',
        });
    }
}

module.exports = {
    authUser,
}