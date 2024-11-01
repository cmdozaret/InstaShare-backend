const Sequelize = require('sequelize');
const { sequelize } = require('../../../common/db');

exports.loadModel = function loadModel() {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      refreshToken: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    },
    {
      comment: 'A example model.',
      freezeTableName: true,
      tableName: 'User',
      hooks: {},
      defaultScope: {
        // Hides the password and the refreshToken fields
        attributes: { exclude: ['password', 'refreshToken'] },
      },
      scopes: {
        withPassword: {
          // Include password if needed
          attributes: { include: ['password'] },
        },
        withRefreshToken: {
          // Include refreshToken if needed
          attributes: { include: ['refreshToken'] },
        },
      },
    },
  );
  User.associate = function () {
    const { models } = sequelize;

    models.User.hasMany(models.File, {
      foreignKey: 'UserId',
    })
  }
  return User;
}
