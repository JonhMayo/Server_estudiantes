const Curso = require('./cursodb');
const Alumno = require('./estudiantesdb');
const Profesor = require('./profesoresdb');

Curso.belongsToMany(Alumno, { through: 'cursoalumnos', foreignKey: 'CursoId', otherKey: 'AlumnoId' });
Curso.belongsToMany(Profesor, { through: 'cursoprofesores', foreignKey: 'CursoId', otherKey: 'ProfesorId' });
Alumno.belongsToMany(Curso, { through: 'cursoalumnos', foreignKey: 'AlumnoId', otherKey: 'CursoId' });
Profesor.belongsToMany(Curso, { through: 'cursoprofesores', foreignKey: 'ProfesorId', otherKey: 'CursoId' });

module.exports = {
    Curso,
    Alumno,
    Profesor
};