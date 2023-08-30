// Aquí se importan los modelos necesarios
const { 
    Bootcamp,
    User 
} = require('../models');

// Aquí esta la Función para crear un nuevo usuario
const createUser = async (user) => {
    try {
        // Aquí se puede Verificar si el correo electrónico ya existe en la base de datos
        const userfind = await User.findAll({where: {email: user.email.toLowerCase()}});
        if (userfind[0] && userfind[0]['dataValues']) 
        {
            console.log(`email ${user.email.toLowerCase()} ya existe`)
            return { message: `email ${user.email.toLowerCase()} ya existe` };
        } else {
            // Aquí se Crear un nuevo usuario
            const userResponse = await User.create({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email.toLowerCase()
            });
            console.log(`Se ha creado el usuario ${JSON.stringify(userResponse, null, 4)}`);
            return userResponse;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí está la Función para buscar y devolver todos los usuarios
const findAllUser = async () => {
    try {
        // Aquí se pueden Buscar todos los usuarios junto con la información de sus bootcamps
        const allUsers = await User.findAll({order: ['id'], 
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamp',
                    attributes: ['id', 'title'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se han encontrado los usuarios ${JSON.stringify(allUsers, null, 4)}`);
        return allUsers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí está la Función para buscar y devolver un usuario por su ID
const findUserById = async (id) => {
    try {
        //Aquí se puede Buscar un usuario por su ID junto con la información de sus bootcamps
        const user = await User.findByPk(id,{include: [
            {
                model: Bootcamp,
                as: 'bootcamp',
                attributes: ['id', 'title'],
                through: {
                    attributes: []
                }
            }
        ]});
        if (user) {
            console.log(`Se ha encontrado el usuario ${JSON.stringify(user, null, 4)}`);
            return user;
        } else {
            console.log(`No Se ha encontrado el usuario con id ${id}`);
            return { message: 'Usuario no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí está la Función para actualizar un usuario por su ID
const updateUserById = async (id, user) => {
    try {
        // Aqúi se puede Verificar si el usuario existe antes de actualizarlo
        const userFound = await User.findByPk(id);
        if (userFound) {
            // Aquí se puede Actualizar la información del usuario
            const userResponse = await User.update(user, {
                where: { id }
            });
            return userResponse;            
        } else {
            return { message: 'Usuario no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí está la Función para eliminar un usuario por su ID
const deleteUserById = async (id) => {
    try {
        // Aquí podemos Verificar si el usuario existe antes de eliminarlo
        const userFound = await User.findByPk(id);
        if (userFound) {
            // Aquí podemos Eliminar el usuario y devolver la respuesta junto con los datos del usuario eliminado
            const userResponse = await User.destroy({
                where: { id }
            });
            return [userResponse, userFound];            
        } else {
            return { message: 'Usuario no Encontrado' };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Aquí podemos Exportar las funciones para su uso en otros archivos
module.exports = { createUser, findAllUser, findUserById, updateUserById, deleteUserById }
