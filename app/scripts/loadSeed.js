// Aquí se Importa los modelos Bootcamp y User desde el archivo '../models'
const { 
   Bootcamp,
   User 
} = require('../models');

// Aquí está la Función para cargar datos de usuarios en la base de datos
const load_user = async () => {
   console.log('*********CREANDO SEED USER*********');
   // Aquí se Crean varios usuarios usando el modelo User
   await User.create({firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com'});
   await User.create({firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com'});
   await User.create({firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com'});
   await User.create({firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com'});
   return {message: 'Datos Guardados Correctamente User'};
}

// Aquí está la Función para cargar datos de bootcamps en la base de datos
const load_bootcamp = async () => {
   console.log('*********CREANDO SEED BOOTCAMP*********');
   // Creando varios bootcamps usando el modelo Bootcamp
   await Bootcamp.create({title:'Introduciendo El Bootcamp De React.', 
                          cue: 10, 
                          description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.'});

   await Bootcamp.create({title:'Bootcamp Desarrollo Web Full Stack.', 
                          cue: 12, 
                          description: 'Crearás aplicaciones web utilizand las tecnologías y lenguajes más actuales y populares como: JavaScript, nodeJS, Angular,MongoDB, ExpressJS.'});
   
   await Bootcamp.create({title:'Bootcamp Big Data, Inteligencia Artificial & Machine Learning ', 
                       cue: 18, 
                       description: 'Domina Data Science, y todo el ecosistema de lenguajes herramientas de Big Data, e intégralos con modelos avanzados'});

   return {message: 'Datos Guardados Correctamente Bootcamp'};
}

// Función para asignar usuarios a bootcamps
const load_bootcampAddUser = async () => {
   console.log('*********CREANDO SEED BOOTCAMP ADD USER*********');

   // Buscando bootcamps y usuarios específicos
   let bootcamp = await Bootcamp.findByPk(1);
   let user = await User.findByPk(1);

   // Asignando usuarios a bootcamps
   await bootcamp.addUser(user);
   user = await User.findByPk(2);
   await bootcamp.addUser(user);

   bootcamp = await Bootcamp.findByPk(2);
   user = await User.findByPk(1);
   await bootcamp.addUser(user);

   bootcamp = await Bootcamp.findByPk(3);
   user = await User.findByPk(1);
   await bootcamp.addUser(user);
   user = await User.findByPk(2);
   await bootcamp.addUser(user);
   user = await User.findByPk(3);
   await bootcamp.addUser(user);

   return {message: 'Datos Guardados Correctamente User'};
}

// Esta es Función principal para cargar todos los datos
const load_data = async () => {
   console.log(await load_user());
   console.log(await load_bootcamp());
   console.log(await load_bootcampAddUser());
}

// Aquí se está Exportando la función load_data para su uso en otros archivos
module.exports = { load_data };
