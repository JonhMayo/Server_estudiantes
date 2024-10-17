
const Estudiantes = require('../models/estudiantes');

class EstudiantesServicio {
  async getAllEstudiantes() {
    try {
      const estudiantes = await Estudiantes.findAll();
      return estudiantes;
    } catch (error) {
      throw error;
    }
  }

  async getEstudianteById(id) {
    try {
      const estudiante = await Estudiantes.findById(id);
      if (!estudiante) {
        throw new Error(`Estudiante no encontrado con id ${id}`);
      }
      return estudiante;
    } catch (error) {
      throw error;
    }
  }

  async getEstudianteByMatricula(matricula) {
    try {
      const estudiante = await Estudiantes.findByMatricula(matricula);
      if (!estudiante) {
        throw new Error(`Estudiante no encontrado con matricula ${matricula}`);
      }
      return estudiante;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EstudiantesServicio;