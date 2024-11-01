const { sequelize } = require('../../../common/db');
const { models } = sequelize;

const bcrypt = require('bcryptjs');

module.exports = async function (req, res) {
    try {
        let file = req.file;
        const { name } = req.body;
        file.name = name;
        await file.save();
        return res.status(200).json({
            message: 'File updated successfully',
        });
    } catch (error) {
        return res.status(error.status || 500).json(error);
    }
}
