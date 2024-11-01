const { sequelize } = require('../../../common/db');

module.exports = async function (req, res) {
  try {
    await req.file.destroy();
    // No Content.
    return res.sendStatus(204);
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error deleting file',
    })
  }
}
