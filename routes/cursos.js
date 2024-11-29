const express = require('express');
const router = express.Router();
const controladores = require('../controllers/cursodb');

router.get('/cursos', controladores.getCursos);
router.get('/cursos/:id', controladores.getCursoById);
router.post('/cursos', controladores.createCurso);
router.put('/cursos/:id', controladores.updateCurso);
router.patch('/cursos/:id', controladores.patchCurso);
router.delete('/cursos/:id', controladores.deleteCurso);
router.post('/cursos/inscribir', controladores.inscribirEstudiante);
router.post('/cursos/eliminar-estudiante', controladores.eliminarEstudiante);
router.post('/cursos/asignar-profesor', controladores.asignarProfesor);
router.post('/cursos/eliminar-profesor', controladores.eliminarProfesorDeCurso);
router.get('/estudiantes/:estudianteId/cursos', controladores.getCursosDeEstudiante);
router.get('/estudiantes/:estudianteId/profesores', controladores.getProfesoresDeEstudiante);
router.get('/profesores/:profesorId/cursos', controladores.getCursosDeProfesor);
router.get('/profesores/:profesorId/estudiantes', controladores.getEstudiantesDeProfesor);

module.exports = router;