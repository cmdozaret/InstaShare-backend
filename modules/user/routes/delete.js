const { sequelize } = require('../../../common/db');

module.exports = async function (req, res) {
  try {
    if(req.user.id !== req.loggedUser.id) {
      const error = new Error();
      error.status = 403;
      error.message = 'You can only delete your own profile';
      throw error;
  }
    await req.user.destroy();
    // No Content.
    return res.sendStatus(204);
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error deleting user',
    })
  }
}
