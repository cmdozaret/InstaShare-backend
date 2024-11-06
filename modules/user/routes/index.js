const { sequelize } = require('../../../common/db');
const { models } = sequelize;

let responseObj = require('../../../common/dataStructure/response');

module.exports = async function (req, res) {
  try {
    const users = await models.User.findAll();
    responseObj.success = true;
    responseObj.data = users;
    responseObj.message = "";
    responseObj.status = 200;
    return res.status(200).json(responseObj);
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error getting users list',
    });
  }
}