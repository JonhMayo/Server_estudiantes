const Curso = require('../models/cursosdb');
const Alumno = require('../models/estudiantesdb');
const Profesor = require('../models/profesoresdb');

Curso.belongsToMany(Alumno, { through: 'CursoAlumnos' });
Alumno.belongsToMany(Curso, { through: 'CursoAlumnos' });

Curso.belongsToMany(Profesor, { through: 'CursoProfesores' });
Profesor.belongsToMany(Curso, { through: 'CursoProfesores' });

module.exports = {
    Curso,
    Alumno,
    Profesor
};