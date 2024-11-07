const { Alumno } = require('../models/asociaciones');

// Obtener todos los estudiantes
const getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Alumno.findAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).send('Error al obtener los estudiantes');
    }
};

// Obtener un estudiante por ID
const getEstudianteById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const estudiante = await Alumno.findByPk(id);
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).send('Error al obtener el estudiante');
    }
};

// Obtener un estudiante por matrícula
const getEstudianteByMatricula = async (req, res) => {
    const matricula = req.params.matricula;
    try {
        const estudiante = await Alumno.findOne({ where: { matricula } });
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).send('Error al obtener el estudiante');
    }
};

// Crear un nuevo estudiante
const createEstudiante = async (req, res) => {
    const { id, matricula, nombre } = req.body;
    
    if (!id || !matricula || !nombre) {
        return res.status(400).send('Datos incompletos. Se requiere id, matrícula y nombre');
    }

    try {
        const estudianteExistente = await Alumno.findByPk(id);
        if (estudianteExistente) {
            return res.status(400).send('Ya existe un estudiante con ese ID');
        }

        const nuevoEstudiante = await Alumno.create(req.body);
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(500).send('Error al crear el estudiante');
    }
};

// Actualizar un estudiante por ID
const updateEstudiante = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    try {
        const estudiante = await Alumno.findByPk(id);
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }

        await estudiante.update(datosActualizados);
        res.status(200).send('Estudiante actualizado exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el estudiante');
    }
};

// Modificar parcialmente un estudiante por ID
const patchEstudiante = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;

    try {
        const estudiante = await Alumno.findByPk(id);
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }

        await estudiante.update(datosParciales);
        res.status(200).send('Estudiante actualizado exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el estudiante');
    }
};

// Eliminar un estudiante por ID
const deleteEstudiante = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const estudiante = await Alumno.findByPk(id);
        if (!estudiante) {
            return res.status(404).send(`Estudiante no encontrado con ID ${id}`);
        }

        await estudiante.destroy();
        res.status(200).send(`Estudiante con ID ${id} eliminado exitosamente`);
    } catch (error) {
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