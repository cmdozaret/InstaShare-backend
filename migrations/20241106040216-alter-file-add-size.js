'use strict';
const tableName = "File";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const defintions = [
      {
        columnName: "originalSize",
        definition: {
          type: Sequelize.STRING,
          allowNull: true,
        }
      },
      {
        columnName: "zippedSize",
        definition: {
          type: Sequelize.STRING,
          allowNull: true,
        }
      },
    ]
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    for (const item of defintions) {
      await queryInterface.addColumn(tableName, item.columnName, item.definition);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    for (const item of defintions) {
      await queryInterface.removeColumn(tableName, item.columnName);
    }
  }
};