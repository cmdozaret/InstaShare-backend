/**
 * This configuration is seeder to sequelize via ../../.sequelizerc
 * */
const lodash = require('lodash')

const supportedEnvMap = [
  'staging',
  'development',
]

const envConfigToExport = {}

lodash.forEach(supportedEnvMap, (env) => {
  const envConfig = require(`./${env}.json`);

  const dbConfig = envConfig.database;
  const { activeDialect } = dbConfig;
  const { dialects } = dbConfig;

  envConfigToExport[env] = {
    dialect: activeDialect,
  }

  lodash.merge(envConfigToExport[env], dialects[activeDialect], {});
})

module.exports = envConfigToExport;