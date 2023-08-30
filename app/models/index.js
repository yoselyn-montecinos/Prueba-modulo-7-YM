// Se importan los modelos de User y Bootcamp desde los archivos correspondientes
const User = require('./user.model');
const Bootcamp = require('./bootcamp.model');

// Se define una relación muchos a muchos entre User y Bootcamp
User.belongsToMany(Bootcamp, {
    through: 'user_bootcamp',       // Tabla pivot para la relación
    as: 'bootcamp',                 // Nombre del alias para la relación en el modelo User
    foreignKey: 'user_id'           // Clave foránea en la tabla pivot que referencia a User
});

// Se define una relación muchos a muchos entre Bootcamp y User
Bootcamp.belongsToMany(User, {
    through: 'user_bootcamp',       // Tabla pivot para la relación
    as: 'user',                     // Nombre del alias para la relación en el modelo Bootcamp
    foreignKey: 'bootcamp_id'       // Clave foránea en la tabla pivot que referencia a Bootcamp
});

// Se exportan los modelos User y Bootcamp, junto con sus relaciones configuradas
module.exports = {
    User,
    Bootcamp
}
