const { Profesor } = require('../models/asociaciones');

// Obtener todos los profesores
const getProfesores = async (req, res) => {
    try {
        const allProfesores = await Profesor.findAll();
        res.status(200).json(allProfesores);
    } catch (error) {
        res.status(500).send('Error al obtener los profesores');
    }
};

// Obtener un profesor por ID
const getProfesorById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }
        res.status(200).json(profesor);
    } catch (error) {
        res.status(500).send('Error al obtener el profesor');
    }
};

// Crear un nuevo profesor
const createProfesor = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).send('Datos incompletos. Se requiere nombre del profesor');
    }

    try {
        const nuevoProfesor = await Profesor.create(req.body);
        res.status(201).json(nuevoProfesor);
    } catch (error) {
        res.status(500).send('Error al crear el profesor');
    }
};

// Actualizar un profesor por ID
const updateProfesor = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    try {
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }

        await profesor.update(datosActualizados);
        res.status(200).send('Profesor actualizado exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el profesor');
    }
};

// Modificar parcialmente un profesor por ID
const patchProfesor = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;

    try {
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }

        await profesor.update(datosParciales);
        res.status(200).send('Profesor actualizado exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el profesor');
    }
};

// Eliminar un profesor por ID
const deleteProfesor = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).send(`Profesor no encontrado con ID ${id}`);
        }

        await profesor.destroy();
        res.status(200).send(`Profesor con ID ${id} eliminado exitosamente`);
    } catch (error) {
        res.status(500).send('Error al intentar eliminar el profesor');
    }
};

// Agregar un curso a un profesor
const agregarCursoAProfesor = async (req, res) => {
    const { profesorId, cursoId } = req.body;

    try {
        const profesor = await Profesor.findByPk(profesorId);
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }

        await profesor.addCurso(cursoId); // Relación muchos a muchos definida en asociaciones
        res.status(200).send(`Curso ${cursoId} agregado al profesor ${profesorId}`);
    } catch (error) {
        res.status(500).send('Error al agregar el curso al profesor');
    }
};

// Eliminar un curso de un profesor
const eliminarCursoDeProfesor = async (req, res) => {
    const { profesorId, cursoId } = req.body;

    try {
        const profesor = await Profesor.findByPk(profesorId);
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }

        await profesor.removeCurso(cursoId); // Relación muchos a muchos definida en asociaciones
        res.status(200).send(`Curso ${cursoId} eliminado del profesor ${profesorId}`);
    } catch (error) {
        res.status(500).send('Error al eliminar el curso del profesor');
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
};