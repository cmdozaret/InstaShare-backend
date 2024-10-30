const { sequelize } = require('../../../common/db');
const { models } = sequelize;

const bcrypt = require('bcryptjs');

module.exports = async function (req, res) {
    try {
        let user = req.user;
        for (const attribute in req.body) {
            user[attribute] = req.body[attribute];
        }
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
        }
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(error.status || 500).json(error);
    }
}
