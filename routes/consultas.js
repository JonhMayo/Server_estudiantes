const express = require('express');
const router = express.Router();
const { buscarEntidad, editarAlumno, 
    editarCurso, 
    editarProfesor, 
    eliminarAlumno, 
    eliminarCurso, 
    eliminarProfesor,
    crearAlumno,
    crearCurso,
    crearProfesor  } = require('../controllers/consultasController');

router.get('/buscar-entidad', buscarEntidad);
router.put('/editar-alumno/:id', editarAlumno);
router.put('/editar-curso/:id', editarCurso);
router.put('/editar-profesor/:id', editarProfesor);
router.delete('/eliminar-alumno/:id', eliminarAlumno);
router.delete('/eliminar-curso/:id', eliminarCurso);
router.delete('/eliminar-profesor/:id', eliminarProfesor);
router.post('/crear-alumno', crearAlumno);
router.post('/crear-curso', crearCurso);
router.post('/crear-profesor', crearProfesor);


module.exports = router;