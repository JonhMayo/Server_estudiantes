const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Profesor = sequelize.define('Profesor', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Profesor;