const profesores = require('../models/profesores');

const getProfesores = (req, res) => {
    const allProfesores = profesores.findAll();
    res.status(200).json(allProfesores);
};

const getProfesorById = (req, res) => {
    const id = parseInt(req.params.id);
    const profesor = profesores.findById(id);
    if (!profesor) {
        return res.status(404).send('Profesor no encontrado');
    }
    res.status(200).json(profesor);
};

const createProfesor = (req, res) => {
    const nuevoProfesor = req.body;
    profesores.add(nuevoProfesor);
    res.status(201).send('Profesor creado exitosamente');
};

const updateProfesor = (req, res) => {
    const id = parseInt(req.params.id);
    if (profesores.save(id, req.body)) {
        res.status(200).send('Profesor actualizado');
    } else {
        res.status(404).send('Profesor no encontrado');
    }
};

const patchProfesor = (req, res) => {
    const id = parseInt(req.params.id);
    if (profesores.save(id, req.body)) {
        res.status(200).send('Profesor modificado');
    } else {
        res.status(404).send('Profesor no encontrado');
    }
};

const deleteProfesor = (req, res) => {
    const id = parseInt(req.params.id);
    if (profesores.deleteById(id)) {
        res.status(200).send(`Profesor con ID ${id} eliminado`);
    } else {
        res.status(404).send('Profesor no encontrado');
    }
};

const agregarCursoAProfesor = (req, res) => {
    const { profesorId, cursoId } = req.body;
    if (profesores.agregarCurso(profesorId, cursoId)) {
        res.status(200).send(`Curso ${cursoId} agregado al profesor ${profesorId}`);
    } else {
        res.status(400).send('No se pudo agregar el curso al profesor');
    }
};

const eliminarCursoDeProfesor = (req, res) => {
    const { profesorId, cursoId } = req.body;
    if (profesores.eliminarCurso(profesorId, cursoId)) {
        res.status(200).send(`Curso ${cursoId} eliminado del profesor ${profesorId}`);
    } else {
        res.status(400).send('No se pudo eliminar el curso del profesor');
    }
};

module.exports = {
    getProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    patchProfesor,
    deleteProfesor,
    agregarCursoAProfesor,
    eliminarCursoDeProfesor
}