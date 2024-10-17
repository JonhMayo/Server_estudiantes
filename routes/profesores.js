const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

router.get('/profesores', profesoresController.getProfesores);
router.get('/profesores/:id', profesoresController.getProfesorById);
router.post('/profesores', profesoresController.createProfesor);
router.put('/profesores/:id', profesoresController.updateProfesor);
router.patch('/profesores/:id', profesoresController.patchProfesor);
router.delete('/profesores/:id', profesoresController.deleteProfesor);
router.post('/profesores/agregar-curso', profesoresController.agregarCursoAProfesor);
router.post('/profesores/eliminar-curso', profesoresController.eliminarCursoDeProfesor);

module.exports = router;