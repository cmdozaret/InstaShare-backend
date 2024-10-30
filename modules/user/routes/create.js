
const { sequelize } = require('../../../common/db');
const { models } = sequelize;

module.exports = async function (req, res) {
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    if(!user.username || !user.email || !user.password) {
      return res.status(400).json({
        message: 'Required field(s) missing',
      });
    }
    const userInstance = await models.User.create(user);

    return res.status(201).json(userInstance);
  }
  catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Error creating new user',
    })
  }
}
