// Aquí se importa el módulo Sequelize para la gestión de la base de datos
const { Sequelize } = require('sequelize');

// Aquí se importa el módulo dotenv para cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Aquí se crea una instancia de Sequelize para establecer la conexión a la base de datos
const sequelize = new Sequelize(
    process.env.PG_DATABASE,        // Nombre de la base de datos obtenido desde las variables de entorno
    process.env.PG_USER,            // Nombre de usuario de la base de datos obtenido desde las variables de entorno
    process.env.PG_PASSWORD,        // Contraseña de la base de datos obtenida desde las variables de entorno
    {
        host: process.env.PG_HOST,   // Host de la base de datos obtenido desde las variables de entorno
        port: process.env.PG_PORT,   // Puerto de la base de datos obtenido desde las variables de entorno
        dialect: 'postgres',         // Especificando que se usará PostgreSQL como el dialecto de la base de datos
        pool: {                      // Configuración de la agrupación de conexiones (pool)
            max: Number(process.env.PG_MAX),             // Número máximo de conexiones en el pool
            min: 0,                                      // Número mínimo de conexiones en el pool
            acquire: Number(process.env.PG_CONNECTIONTIMEOUTMILLIS),  // Tiempo máximo para adquirir una conexión
            idle: Number(process.env.PG_IDLETIMEOUTMILLIS)  // Tiempo máximo que una conexión puede estar inactiva en el pool
        },
        define: {
            freezeTableName: true,   // Evitar que Sequelize pluralice los nombres de las tablas
            underscored: true        // Utilizar el formato snake_case para los nombres de las columnas y relaciones
        }
    }
);

// Exportando la instancia de Sequelize para que pueda ser utilizada en otros módulos
module.exports = sequelize;
