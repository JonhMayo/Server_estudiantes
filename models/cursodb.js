const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Curso = sequelize.define('Curso', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profesorId: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

module.exports = Curso;