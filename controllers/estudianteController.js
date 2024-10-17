
const { findAll, findById, findByMatricula, add, save, deleteById } = require('../models/estudiantes');

const getEstudiantes = (req, res) => {
    const estudiantes = findAll();
    res.status(200).json(estudiantes);
};

const getEstudianteById = (req, res) => {
    const id = parseInt(req.params.id);
    const estudiante = findById(id);
    
    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    res.status(200).json(estudiante);
};

const getEstudianteByMatricula = (req, res) => {
    const matricula = req.params.matricula;
    const estudiante = findByMatricula(matricula);

    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    res.status(200).json(estudiante);
};

const createEstudiante = (req, res) => {
    const nuevoEstudiante = req.body;

    const id = findById(nuevoEstudiante.id);
    if (id) {
        return res.status(400).send('Ya existe un estudiante con ese ID');
    }

    if (!nuevoEstudiante.id || !nuevoEstudiante.matricula || !nuevoEstudiante.nombre) {
        return res.status(400).send('Datos incompletos. Se requiere id, matrícula y nombre');
    }

    add(nuevoEstudiante);
    res.status(201).send('Estudiante creado exitosamente');
};

const updateEstudiante = (req, res) => {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    if (!findById(id)) {
        return res.status(404).send('Estudiante no encontrado');
    }

    if (save(id, datosActualizados)) {
        res.status(200).send('Estudiante modificado exitosamente');
    } else {
        res.status(400).send('No se pudo modificar el estudiante');
    }
};

const patchEstudiante = (req, res) => {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;

    if (!findById(id)) {
        return res.status(404).send('Estudiante no encontrado');
    }

    if (save(id, datosParciales)) {
        res.status(200).send('Estudiante actualizado exitosamente');
    } else {
        res.status(400).send('No se pudo modificar el estudiante');
    }
};

const deleteEstudiante = (req, res) => {
    const id = parseInt(req.params.id);

    const estudiante = findById(id);
    if (!estudiante) {
        return res.status(404).send(`Estudiante no encontrado con ID ${id}`);
    }

    const eliminado = deleteById(id);
    if (eliminado) {
        res.status(200).send(`Estudiante con ID ${id} eliminado exitosamente`);
    } else {
        res.status(500).send('Error al intentar eliminar el estudiante');
    }
};

module.exports = {
    getEstudiantes,
    getEstudianteById,
    getEstudianteByMatricula,
    createEstudiante,
    updateEstudiante,
    patchEstudiante,
    deleteEstudiante
};