
function findAll() {
    return cursos;
}

function findById(id) {
    return cursos.find(curso => curso.id === id);
}

function add(curso) {
    cursos.push(curso);
}

function save(id, data) {
    const index = cursos.findIndex(curso => curso.id === id);
    if (index !== -1) {
        cursos[index] = { ...cursos[index], ...data };
        return true;
    }
    return false;
}

function deleteById(id) {
    const index = cursos.findIndex(curso => curso.id === id);
    if (index !== -1) {
        cursos.splice(index, 1);
        return true;
    }
    return false;
}

function agregarEstudiante(cursoId, estudianteId) {
    const curso = findById(cursoId);
    if (curso && !curso.estudiantes.includes(estudianteId)) {
        curso.estudiantes.push(estudianteId);
        return true;
    }
    return false;
}

function eliminarEstudiante(cursoId, estudianteId) {
    const curso = findById(cursoId);
    if (curso) {
        curso.estudiantes = curso.estudiantes.filter(estudiante => estudiante !== estudianteId);
        return true;
    }
    return false;
}

function asignarProfesor(cursoId, profesorId) {
    const curso = findById(cursoId);
    if (curso) {
        curso.profesorId = profesorId;
        return true;
    }
    return false;
}

module.exports = {
    findAll,
    findById,
    add,
    save,
    deleteById,
    agregarEstudiante,
    eliminarEstudiante,
    asignarProfesor,
};