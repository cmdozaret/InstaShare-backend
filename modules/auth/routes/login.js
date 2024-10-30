const { sequelize } = require('../../../common/db');
const { models } = sequelize;

const bcrypt = require('bcryptjs');

module.exports = async function (req, res) {
    try {
        const user = await models.User.findOne({
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
        if (await bcrypt.compare(req.body.password, user.password)) {
            return res.status(200).json(user);
        }
        else {
            const error = new Error();
            error.status = 401;
            error.message = 'Wrong password';
            throw error;
        }
    }
    catch (error) {
        return res.status(error.status || 500).json(error);
    }
}