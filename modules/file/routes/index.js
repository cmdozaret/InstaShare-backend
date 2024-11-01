const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
  try {
    const userId = req.loggedUser.id;
    const files = await models.File.findAll({
      where: {
        UserId: userId,
      }
    });
    return res.status(200).json(files);
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error getting file list',
    });
  }
}