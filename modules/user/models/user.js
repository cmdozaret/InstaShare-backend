const Sequelize = require('sequelize')
const { sequelize } = require('../../../common/db')

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
    },
    {
      comment: 'A example model.',
      freezeTableName: true,
      tableName: 'User',
      hooks: {},
    },
  )
  User.associate = function () {
    const { models } = sequelize
  }
  return User
}
