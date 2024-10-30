const { sequelize } = require('../../../common/db');
const { models } = sequelize;
module.exports = async function (req, res) {
    try {
        let user = req.user;
        for (const attribute in req.body) {
            user[attribute] = req.body[attribute];
        }
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(error.status || 500).json(error);
    }
}
