const Sequelize = require('sequelize');
const { sequelize } = require('../../../common/db');

exports.loadModel = function loadModel() {
  const File = sequelize.define(
    'File',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      data: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    },
    {
      comment: 'A example model.',
      freezeTableName: true,
      tableName: 'File',
      hooks: {},
    },
  );
  File.associate = function () {
    const { models } = sequelize;

    models.File.belongsTo(models.User);
  }
  return File;
}
