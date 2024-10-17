function getAllEstudiantes() {
    fetch('/estudiantes')
        .then(response => response.json())
        .then(data => {
            document.getElementById('getAllResponse').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
}

function getAllEstudiantes1() {
    fetch('/estudiantes')
        .then(response => response.json())
        .then(data => {
            const studentsList = document.getElementById('studentsList');
            studentsList.innerHTML = '';

            data.forEach(estudiante => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <input type="checkbox" id="estudiante-${estudiante.id}" value="${estudiante.id}">
                    <label for="estudiante-${estudiante.id}">${estudiante.nombre} (ID: ${estudiante.id})</label>
                `;
                studentsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteSelectedEstudiantes() {
    const selectedEstudiantes = [];
    const checkboxes = document.querySelectorAll('#studentsList input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        selectedEstudiantes.push(checkbox.value);
    });

    if (selectedEstudiantes.length === 0) {
        document.getElementById('deleteResponse').textContent = 'No has seleccionado ningún estudiante para eliminar';
        return;
    }

    selectedEstudiantes.forEach(id => {
        fetch(`/estudiantes/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al eliminar al estudiante con ID ${id}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('deleteResponse').textContent += `Estudiante con ID ${id} eliminado exitosamente.\n`;
            getAllEstudiantes();
        })
        .catch(error => {
            document.getElementById('deleteResponse').textContent += `${error.message}\n`;
        });
    });
}

function getEstudianteById() {
    const id = document.getElementById('idInput').value;
    fetch(`/estudiantes/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Estudiante no encontrado');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('getByIdResponse').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('getByIdResponse').textContent = error.message;
        });
}

function addEstudiante() {
    const id = document.getElementById('newId').value;
    const matricula = document.getElementById('newMatricula').value;
    const nombre = document.getElementById('newNombre').value;

    const newEstudiante = { id: parseInt(id), matricula, nombre };

    fetch('/estudiantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEstudiante)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo agregar el estudiante');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('addResponse').textContent = data;
    })
    .catch(error => {
        document.getElementById('addResponse').textContent = error.message;
    });
}