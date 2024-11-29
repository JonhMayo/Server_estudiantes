const { Alumno, Curso, Profesor } = require('../models/asociaciones');
const { Op } = require('sequelize');

async function buscarEntidad(req, res) {
  const { tipo, nombre } = req.query;

  try {
    if (tipo === 'Alumno') {
      const alumnos = await Alumno.findAll({
        where: { nombre: { [Op.like]: `%${nombre}%` } },
        include: [{ model: Curso, include: [Profesor] }]
      });
      return res.json({ tipo: 'Alumno', resultados: alumnos });
    } else if (tipo === 'Curso') {
      const cursos = await Curso.findAll({
        where: { nombre: { [Op.like]: `%${nombre}%` } },
        include: [Alumno, Profesor]
      });
      return res.json({ tipo: 'Curso', resultados: cursos });
    } else if (tipo === 'Profesor') {
      const profesores = await Profesor.findAll({
        where: { nombre: { [Op.like]: `%${nombre}%` } },
        include: [Curso]
      });
      return res.json({ tipo: 'Profesor', resultados: profesores });
    }

    res.status(404).json({ error: 'No se encontró la entidad' });
  } catch (error) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
}

async function editarAlumno(req, res) {
  try {
    const { id } = req.params;
    const { nombre, matricula } = req.body;
    const alumno = await Alumno.findByPk(id);
    if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });

    alumno.nombre = nombre || alumno.nombre;
    alumno.matricula = matricula || alumno.matricula;
    await alumno.save();
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el alumno' });
  }
}

async function editarCurso(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const curso = await Curso.findByPk(id);
    if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

    curso.nombre = nombre || curso.nombre;
    await curso.save();
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
}

async function editarProfesor(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const profesor = await Profesor.findByPk(id);
    if (!profesor) return res.status(404).json({ message: 'Profesor no encontrado' });

    profesor.nombre = nombre || profesor.nombre;
    await profesor.save();
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
}

// Eliminar Alumno
async function eliminarAlumno(req, res) {
  try {
    const { id } = req.params;
    const alumno = await Alumno.findByPk(id);
    if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });

    await alumno.destroy();
    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el alumno' });
  }
}

// Eliminar Curso
async function eliminarCurso(req, res) {
  try {
    const { id } = req.params;
    const curso = await Curso.findByPk(id);
    if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

    await curso.destroy();
    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
}

// Eliminar Profesor
async function eliminarProfesor(req, res) {
  try {
    const { id } = req.params;
    const profesor = await Profesor.findByPk(id);
    if (!profesor) return res.status(404).json({ message: 'Profesor no encontrado' });

    await profesor.destroy();
    res.json({ message: 'Profesor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
}

async function crearAlumno(req, res) {
  try {
    const { nombre, matricula } = req.body;
    const nuevoAlumno = await Alumno.create({ nombre, matricula });
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
}

// Crear Curso
async function crearCurso(req, res) {
  try {
    const { nombre } = req.body;
    const nuevoCurso = await Curso.create({ nombre });
    res.status(201).json(nuevoCurso);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el curso' });
  }
}

// Crear Profesor
async function crearProfesor(req, res) {
  try {
    const { nombre } = req.body;
    const nuevoProfesor = await Profesor.create({ nombre });
    res.status(201).json(nuevoProfesor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el profesor' });
  }
}

module.exports = { 
  buscarEntidad, 
  editarAlumno, 
  editarCurso, 
  editarProfesor, 
  eliminarAlumno, 
  eliminarCurso, 
  eliminarProfesor,
  crearAlumno,
  crearCurso,
  crearProfesor 
};