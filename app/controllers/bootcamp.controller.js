// Aquí está Importación de los modelos necesarios
const { 
    Bootcamp,
    User 
} = require('../models');

// Aquí esta la Función para crear un nuevo Bootcamp
const createBootcamp = async (bootcamp) => {
    try {
        // Crear un nuevo Bootcamp en la base de datos
        const bootcampResponse = await Bootcamp.create({
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description
        });

        // Aquí se Imprime el Bootcamp creado en el formato JSON
        console.log(`Se ha creado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
        return bootcampResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí esta la Función para buscar un Bootcamp por su ID
const findBootcampById = async (id) => {
    try {
        // Aquí se Busca un Bootcamp por su ID, incluyendo información del usuario asociado
        const bootcampResponse = await Bootcamp.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        // Comprobar si se encontró el Bootcamp y devolverlo
        if (bootcampResponse) {
            console.log(`Se ha encontrado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
            return bootcampResponse;
        } else {
            console.log(`No se ha encontrado el Bootcamp con ID ${id}`);
            return { message: 'Bootcamp no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí está la Función para buscar y devolver todos los Bootcamps
const findAllBootcamp = async () => {
    try {
        // Buscar y devolver todos los Bootcamps, incluyendo información del usuario asociado
        const bootcamps = await Bootcamp.findAll({
            order: ['id'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        //Aquí se Imprime la lista de Bootcamps encontrados en formato JSON
        console.log(`Se han encontrado Bootcamps ${JSON.stringify(bootcamps, null, 4)}`);
        return bootcamps;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí está la Función para agregar un usuario a un Bootcamp
const addUserToBootcamp = async (bootcampId, userId) => {
    try {
        // Aquí se Busca el Bootcamp por su ID
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.log(`No se encontró Bootcamp con ID ${bootcampId}`);
            return null;
        }

        // Aquí se Busca el usuario por su ID
        const user = await User.findByPk(userId);
        if (!user) {
            console.log(`No se encontró usuario con ID ${userId}`);
            return null;
        }

        // Aquí se Agregar el usuario al Bootcamp
        await bootcamp.addUser(user);
        console.log(`Agregado el usuario ID ${user.id} al Bootcamp con ID ${bootcamp.id}`);
        return [bootcamp, user];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí se Exportan las funciones para su uso en otros módulos
module.exports = { createBootcamp, findBootcampById, findAllBootcamp , addUserToBootcamp }
