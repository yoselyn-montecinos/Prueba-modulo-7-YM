// Importamos el módulo DataTypes de Sequelize para definir los tipos de datos de los campos
const { DataTypes } = require('sequelize');
// Importamos la instancia de Sequelize configurada en db.config.js
const sequelize = require('../config/db.config');

// Se define el modelo User usando el método define de Sequelize
const User = sequelize.define('user', {
    // Campo 'id': Identificador único autoincremental
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    // El Campo 'firstName': Nombre del usuario (cadena de hasta 200 caracteres)
    firstName: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    // El Campo 'lastName': Apellido del usuario (cadena de hasta 200 caracteres)
    lastName: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    // El Campo 'email': Correo electrónico del usuario (cadena de hasta 100 caracteres)
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "users_email_key", // Esto Garantiza que no haya correos electrónicos duplicados
        validate: {
            isEmail: {
                msg: " El Email no cumple con el formato requerido (ejemplo@gmail.com)"
            }
        },
    },
}
);

// Se Exporta el modelo User para que pueda ser utilizado en otras partes de la aplicación
module.exports = User;
