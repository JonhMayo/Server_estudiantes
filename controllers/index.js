const fs = require('fs');
const path = require('path');
const  controllersDirectory = path.join(__dirname, './');
const controllers = {};

fs.readdirSync(controllersDirectory).forEach(file => {
    if(file !== 'index.js' &&  file.endsWith('.js')) {
        const controllerName = file.replace('.js', '');
        controllers[controllerName] = require(path.join(controllersDirectory, file));
    }
});

module.exports = controllers;