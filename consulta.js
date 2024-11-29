const { Curso, Alumno, Profesor } = require('./models/asociaciones');
const sequelize = require('./config/db');

async function main() {
    try {
        await sequelize.sync({ force: true }); 

        const curso1 = await Curso.create({ nombre: 'Tópicos' });
        const curso2 = await Curso.create({ nombre: 'Circuitos Digitales' });
        const curso3 = await Curso.create({ nombre: 'Automatización' });
        const curso4 = await Curso.create({ nombre: 'Aplicaciones Web' });
        const curso5 = await Curso.create({ nombre: 'Bases de Datos' });

        const alumno1 = await Alumno.create({ nombre: 'Juan Hernández', matricula: '1116' });
        const alumno2 = await Alumno.create({ nombre: 'Ana Gonzalez', matricula: '1146' });
        const alumno3 = await Alumno.create({ nombre: 'Armando Casas', matricula: '1191' });
        const alumno4 = await Alumno.create({ nombre: 'Jorge Herrera', matricula: '1055' });
        const alumno5 = await Alumno.create({ nombre: 'Andrea Zapata', matricula: '1299' });

        const profesor1 = await Profesor.create({ nombre: 'Linda Arredondo' });
        const profesor2 = await Profesor.create({ nombre: 'Jorge Ibarra' });
        const profesor3 = await Profesor.create({ nombre: 'Adolfo Ruelas' });
        const profesor4 = await Profesor.create({ nombre: 'Martín Olguin' });
        const profesor5 = await Profesor.create({ nombre: 'Alicia M.' });

        await curso1.addAlumno(alumno1);
        await curso1.addAlumno(alumno2);
        await curso1.addAlumno(alumno3);
        await curso2.addAlumno(alumno1);
        await curso2.addAlumno(alumno4);
        await curso3.addAlumno(alumno5);
        await curso4.addAlumno(alumno2);
        await curso5.addAlumno(alumno3);
        await curso5.addAlumno(alumno4);
        await curso5.addAlumno(alumno5);

        await curso1.addProfesor(profesor1);
        await curso1.addProfesor(profesor2);
        await curso2.addProfesor(profesor3);
        await curso3.addProfesor(profesor1);
        await curso3.addProfesor(profesor4);
        await curso4.addProfesor(profesor5);
        await curso5.addProfesor(profesor2);

        const cursosDeAlumno1 = await alumno1.getCursos();
        console.log(`Cursos de ${alumno1.nombre}:`, cursosDeAlumno1.map(c => c.nombre));

        const alumnosDeCurso1 = await curso1.getAlumnos();
        console.log(`Alumnos en el curso ${curso1.nombre}:`, alumnosDeCurso1.map(a => a.nombre));

        const cursosDeProfesor1 = await profesor1.getCursos();
        console.log(`Cursos del profesor ${profesor1.nombre}:`, cursosDeProfesor1.map(c => c.nombre));

        for (const curso of cursosDeProfesor1) {
            const alumnos = await curso.getAlumnos();
            console.log(`Alumnos en ${curso.nombre} impartido por ${profesor1.nombre}:`, alumnos.map(a => a.nombre));
        }

    } catch (error) {
        console.error("Error en las consultas:", error);
    } finally {
        await sequelize.close();
    }
}

main();