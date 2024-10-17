const profesores = [
    { id: 1, nombre: 'Martin Olguin', cursos: [1] },
    { id: 2, nombre: 'Omar Munoz', cursos: [2] },
];

function findAll() {
    return profesores;
}

function findById(id) {
    return profesores.find(profesor => profesor.id === id);
}

function add(profesor) {
    profesores.push(profesor);
}

function save(id, data) {
    const index = profesores.findIndex(profesor => profesor.id === id);
    if (index !== -1) {
        profesores[index] = { ...profesores[index], ...data };
        return true;
    }
    return false;
  }

function deleteById(id) {
    const index = profesores.findIndex(profesor => profesor.id === id);
    if (index !== -1) {
        profesores.splice(index, 1);
        return true;
    }
    return false;
  }

function agregarCurso(profesorId, cursoId) {
    const profesor = findById(profesorId);
    if (profesor && !profesor.cursos.includes(cursoId)) {
        profesor.cursos.push(cursoId);
        return true;
    }
    return false;
}

function eliminarCurso(profesorId, cursoId) {
    const profesor = findById(profesorId);
    if (profesor) {
        profesor.cursos = profesor.cursos.filter(id => id !== cursoId);
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
    agregarCurso,
    eliminarCurso
};