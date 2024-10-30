const modulesWithRoutes = [
    'auth',
    'user',
];

module.exports = {
    setRoutes(app) {
        modulesWithRoutes.forEach((module) => {
            const moduleX = require(`../modules/${module}`);
            moduleX.setRoutes(app);
        })
    }
}