const Sequelize = require('sequelize');
const env = require('../../config/env');

const dbConfig = env.get('database');

const { activeDialect } = dbConfig;
const config = dbConfig.dialects[activeDialect];

const sequelize = new Sequelize(config);

module.exports = {
    sequelize,
    loadModels: () => {
        // se cargan los modelos
    }
}