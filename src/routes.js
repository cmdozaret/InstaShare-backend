const modulesWithRoutes = [
    'auth',
    'user',
    'file',
];

module.exports = {
    setRoutes(app) {
        modulesWithRoutes.forEach((module) => {
            const moduleX = require(`../modules/${module}`);
            moduleX.setRoutes(app);
        })
    }
}