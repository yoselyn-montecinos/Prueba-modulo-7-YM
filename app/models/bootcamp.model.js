// Importamos el módulo DataTypes de Sequelize, que nos permite definir tipos de datos para los campos de la tabla
const { DataTypes } = require('sequelize');

// Aquí se Importa la instancia de sequelize configurada en db.config.js
const sequelize = require('../config/db.config');

// Aquí se Define el modelo Bootcamp, que representa la tabla 'bootcamp' en la base de datos
const Bootcamp = sequelize.define('bootcamp', {
    // Campo 'id': Identificador único autoincremental
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    // El Campo 'title': Título del bootcamp, de tipo cadena de caracteres con longitud máxima de 200
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    // El Campo 'cue': Número de control de establecimiento, de tipo entero, no nulo, con validación mínima
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    // El Campo 'description': Descripción del bootcamp, de tipo cadena de caracteres con longitud máxima de 250
    description: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
});

// Aquí se Exporta el modelo Bootcamp para que pueda ser utilizado en otros archivos
module.exports = Bootcamp;
