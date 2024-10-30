const path = require('path');
const nconf = require('nconf');
const fs = require('fs');

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//
nconf.argv().env('_');

// Setting 'development' as default enviroment
let environment = nconf.get('NODE:ENV') || 'development';
environment = environment.toLowerCase();

// Reading enviroment data
let data = fs.readFileSync(
    path.resolve(process.cwd(), `config`, `env`, `${environment}.json`)
);
data = JSON.parse(data.toString());

// Function to return custom requested enviroment data
const env = () => {
    const get = (pPath) => {
        const pathStrings = pPath.split(':');
        let result = data;
        pathStrings.forEach((item) => {
            result = result ? result[item] : undefined;
        })
        return result;
    }
    return {
        get,
        env: environment,
    }
}

module.exports = env();