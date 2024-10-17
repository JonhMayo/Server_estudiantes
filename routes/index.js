const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();
const routesDirectory = path.join(__dirname, './');
const routes = {};

fs.readdirSync(routesDirectory).forEach(file => {
    if(file !== 'index.js' &&  file.endsWith('.js')) {
        const routeName = file.replace('.js', '');
        const routePath = path.join(routesDirectory, file);
        routes[routeName] = require(routePath);
        router.use(routes[routeName]);
    }
});

module.exports = router;