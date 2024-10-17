const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController');

router.get('/cursos', cursosController.getCursos);
router.get('/cursos/:id', cursosController.getCursoById);
router.post('/cursos', cursosController.createCurso);
router.put('/cursos/:id', cursosController.updateCurso);
router.patch('/cursos/:id', cursosController.patchCurso);
router.delete('/cursos/:id', cursosController.deleteCurso);
router.post('/cursos/inscribir', cursosController.inscribirEstudiante);
router.post('/cursos/eliminar-estudiante', cursosController.eliminarEstudiante);
router.post('/cursos/asignar-profesor', cursosController.asignarProfesor);
router.post('/cursos/eliminar-profesor', cursosController.eliminarProfesorDeCurso);
router.get('/estudiantes/:estudianteId/cursos', cursosController.getCursosDeEstudiante);
router.get('/estudiantes/:estudianteId/profesores', cursosController.getProfesoresDeEstudiante);
router.get('/profesores/:profesorId/cursos', cursosController.getCursosDeProfesor);
router.get('/profesores/:profesorId/estudiantes', cursosController.getEstudiantesDeProfesor);

module.exports = router;