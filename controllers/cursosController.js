const cursos = require('../models/cursos');
const estudiantes = require('../models/estudiantes');
const profesores = require('../models/profesores');

const getCursos = (req, res) => {
    res.status(200).json(cursos.findAll());
};

const getCursoById = (req, res) => {
    const id = parseInt(req.params.id);
    const curso = cursos.findById(id);
    if (!curso) {
        return res.status(404).send('Curso no encontrado');
    }
    res.status(200).json(curso);
};

const createCurso = (req, res) => {
    const nuevoCurso = req.body;
    cursos.add(nuevoCurso);
    res.status(201).send('Curso creado exitosamente');
};

const updateCurso = (req, res) => {
    const id = parseInt(req.params.id);
    if (cursos.save(id, req.body)) {
        res.status(200).send('Curso actualizado');
    } else {
        res.status(404).send('Curso no encontrado');
    }
};

const patchCurso = (req, res) => {
    const id = parseInt(req.params.id);
    if (cursos.save(id, req.body)) {
        res.status(200).send('Curso modificado');
    } else {
        res.status(404).send('Curso no encontrado');
    }
};

const deleteCurso = (req, res) => {
    const id = parseInt(req.params.id);
    if (cursos.deleteById(id)) {
        res.status(200).send(`Curso con ID ${id} eliminado`);
    } else {
        res.status(404).send('Curso no encontrado');
    }
};

const inscribirEstudiante = (req, res) => {
    const { estudianteId, cursoId } = req.body;
    const curso = cursos.findById(cursoId);
    const estudiante = estudiantes.findById(estudianteId);

    if (!curso) {
        return res.status(404).send('Curso no encontrado');
    }
    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    if (cursos.agregarEstudiante(cursoId, estudianteId) && estudiantes.inscribirEnCurso(estudianteId, cursoId)) {
        res.status(200).send('Estudiante inscrito en el curso correctamente');
    } else {
        res.status(400).send('No se pudo inscribir al estudiante en el curso');
    }
};

const eliminarEstudiante = (req, res) => {
    const { estudianteId, cursoId } = req.body;
    const curso = cursos.findById(cursoId);
    const estudiante = estudiantes.findById(estudianteId);

    if (!curso) {
        return res.status(404).send('Curso no encontrado');
    }
    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    if (cursos.eliminarEstudiante(cursoId, estudianteId) && estudiantes.eliminarDeCurso(estudianteId, cursoId)) {
        res.status(200).send('Estudiante eliminado del curso correctamente');
    } else {
        res.status(400).send('No se pudo eliminar al estudiante del curso');
    }
};

const asignarProfesor = (req, res) => {
    const { profesorId, cursoId } = req.body;
    const curso = cursos.findById(cursoId);
    const profesor = profesores.findById(profesorId);

    if (!curso) {
        return res.status(404).send('Curso no encontrado');
    }
    if (!profesor) {
        return res.status(404).send('Profesor no encontrado');
    }

    if (cursos.asignarProfesor(cursoId, profesorId)) {
        res.status(200).send('Profesor asignado al curso correctamente');
    } else {
        res.status(400).send('No se pudo asignar el profesor al curso');
    }
};

const eliminarProfesorDeCurso = (req, res) => {
    const { profesorId, cursoId } = req.body;
    const curso = cursos.findById(cursoId);

    if (curso && curso.profesorId === profesorId) {
        curso.profesorId = null;  // Desasignar el profesor
        res.status(200).send(`Profesor con ID ${profesorId} eliminado del curso con ID ${cursoId}`);
    } else {
        res.status(404).send('No se pudo encontrar el curso o el profesor no está asignado');
    }
};

const getCursosDeEstudiante = (req, res) => {
    const estudianteId = parseInt(req.params.estudianteId);
    const estudiante = estudiantes.findById(estudianteId);

    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    const cursosDelEstudiante = cursos.findAll().filter(curso => estudiante.cursos.includes(curso.id));
    res.status(200).json(cursosDelEstudiante);
};

const getProfesoresDeEstudiante = (req, res) => {
    const estudianteId = parseInt(req.params.estudianteId);
    const estudiante = estudiantes.findById(estudianteId);

    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    const profesoresDeEstudiante = [];
    estudiante.cursos.forEach(cursoId => {
        const curso = cursos.findById(cursoId);
        if (curso && curso.profesorId) {
            const profesor = profesores.findById(curso.profesorId);
            if (profesor && !profesoresDeEstudiante.includes(profesor)) {
                profesoresDeEstudiante.push(profesor);
            }
        }
    });

    res.status(200).json(profesoresDeEstudiante);
};

const getCursosDeProfesor = (req, res) => {
    const profesorId = parseInt(req.params.profesorId);
    const profesor = profesores.findById(profesorId);

    if (!profesor) {
        return res.status(404).send('Profesor no encontrado');
    }

    const cursosDelProfesor = cursos.findAll().filter(curso => curso.profesorId === profesorId);
    res.status(200).json(cursosDelProfesor);
};

const getEstudiantesDeProfesor = (req, res) => {
    const profesorId = parseInt(req.params.profesorId);
    const profesor = profesores.findById(profesorId);

    if (!profesor) {
        return res.status(404).send('Profesor no encontrado');
    }

    const estudiantesDeProfesor = [];
    const cursosDelProfesor = cursos.findAll().filter(curso => curso.profesorId === profesorId);
    cursosDelProfesor.forEach(curso => {
        curso.estudiantes.forEach(estudianteId => {
            const estudiante = estudiantes.findById(estudianteId);
            if (estudiante && !estudiantesDeProfesor.includes(estudiante)) {
                estudiantesDeProfesor.push(estudiante);
            }
        });
    });

    res.status(200).json(estudiantesDeProfesor);
};

module.exports = {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    patchCurso,
    deleteCurso,
    inscribirEstudiante,
    eliminarEstudiante,
    asignarProfesor,
    eliminarProfesorDeCurso,
    getCursosDeEstudiante,
    getProfesoresDeEstudiante,
    getCursosDeProfesor,
    getEstudiantesDeProfesor
};