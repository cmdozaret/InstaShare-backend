'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.createSchema('Business');
    }
    catch (e) {
      console.log(e);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try {
      await queryInterface.dropSchema('Business');
    }
    catch (e) {
      console.log(e);
    }
  }
};
