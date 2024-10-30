const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
  try {
    const users = await models.User.findAll();
    return res.status(200).json(users);
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error getting users list',
    });
  }
}