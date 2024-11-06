const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
  try {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${req.file.name}"`);
    res.send(req.file.data);
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error getting file list',
    });
  }
}