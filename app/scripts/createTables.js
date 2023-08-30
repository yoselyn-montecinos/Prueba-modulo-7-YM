// Aquí está la Importación de los modelos necesarios desde el directorio "../models"
const { 
    Bootcamp,
    User 
} = require('../models');

// Aquí esta la Importación de la función "load_data" desde el archivo "./loadSeed"
const { load_data } = require('./loadSeed')

// Aquí está la Importación de la instancia de Sequelize configurada desde "../config/db.config"
const sequelize = require('../config/db.config');

// Definición de una función autoejecutable asíncrona usando una expresión de función flecha
// Esta función se ejecutará inmediatamente después de su definición
(async () => {
    try {
        // Sincronización de los modelos con la base de datos, forzando la creación de tablas (opción "force: true")
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error(error); // En caso de error durante la sincronización, se muestra el error en la consola
    } finally {
        // Carga de datos utilizando la función "load_data"
        await load_data();

        // Cierre de la conexión de la base de datos
        await sequelize.close();
    }
})();
