const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
  try {
    const userId = req.loggedUser.id;
    const files = await models.File.findAll({
      where: {
        UserId: userId,
      },
      attributes: {
        exclude: [
          'data',
        ],
      },
    });
    let responseObj = require('../../../common/dataStructure/response');
    responseObj.success = true;
    responseObj.status = 200;
    responseObj.message = "";
    responseObj.data = files;
    return res.status(200).json(responseObj);
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error getting file list',
    });
  }
}