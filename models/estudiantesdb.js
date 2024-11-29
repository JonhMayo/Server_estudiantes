const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Alumno = sequelize.define('Alumno', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

module.exports = Alumno;