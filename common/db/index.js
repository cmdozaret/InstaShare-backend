const Sequelize = require('sequelize');
const env = require('../../config/env');

const dbConfig = env.get('database');

const { activeDialect } = dbConfig;
const config = dbConfig.dialects[activeDialect];

const sequelize = new Sequelize(config);

module.exports = {
    sequelize,
    loadModels: () => {
        const modelsToLoad = [
            'user',
            'file',
        ];
        // models are loaded
        modelsToLoad.forEach((modelName) => {
            require(`../../modules/${modelName}`).loadModels();
        });
        const { models } = sequelize;

        // Associate the models
        const modelsArr = Object.keys(models);
        modelsArr.forEach((modelName) => {
            if ('associate' in models[modelName]) {
                models[modelName].associate();
            }
        })
    }
}