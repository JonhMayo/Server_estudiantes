const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantedb');

router.get('/estudiantes', estudiantesController.getEstudiantes);
router.get('/estudiantes/:id', estudiantesController.getEstudianteById);
router.get('/estudiantes/matricula/:matricula', estudiantesController.getEstudianteByMatricula);
router.post('/estudiantes', estudiantesController.createEstudiante);
router.put('/estudiantes/:id', estudiantesController.updateEstudiante);
router.patch('/estudiantes/:id', estudiantesController.patchEstudiante);
router.delete('/estudiantes/:id', estudiantesController.deleteEstudiante);
router.get('/:matricula/kardex', estudiantesController.getKardexEstudiante);

module.exports = router;