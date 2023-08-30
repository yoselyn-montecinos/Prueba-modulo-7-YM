// Se Importan los módulos necesarios
const express = require('express');
const app = express();
require('dotenv').config(); // Cargar variables de entorno desde archivo .env
const PORT = process.env.PORT; // Obtener el puerto desde las variables de entorno
const { StatusCodes } = require('http-status-codes'); // Importar códigos de estado HTTP

// Importar controladores
const { createUser, findAllUser, findUserById, updateUserById, deleteUserById } = require('./app/controllers/user.controller');
const { createBootcamp, findBootcampById, findAllBootcamp, addUserToBootcamp } = require('./app/controllers/bootcamp.controller');

// Middlewares
app.use(express.json()); // Parsear body en formato JSON
app.use(express.urlencoded({ extended: true })); // Parsear datos de formulario

// La Ruta raíz
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Las Rutas para gestionar usuarios
app.post('/user/', async (req, res) => {
  // Para Manejar la creación de usuarios
});

app.get('/users/', async (req, res) => {
  // Para Obtener la lista de usuarios
});

app.get('/user/:id', async (req, res) => {
  // Para Buscar usuario por ID
});

app.put('/user/:id', async (req, res) => {
  // Para Actualizar información de usuario
});

app.delete('/user/:id', async (req, res) => {
  // Para Eliminar usuario por ID
});

// Las Rutas para gestionar bootcamps
app.post('/bootcamp/', async (req, res) => {
  // Para Crear un nuevo bootcamp
});

app.get('/bootcamp/:id', async (req, res) => {
  // Para Buscar bootcamp por ID
});

app.get('/bootcamps/', async (req, res) => {
  // Para Obtener la lista de bootcamps
});

app.post('/bootcamp/adduser/idbootcamp/:idBootcamp/iduser/:idUser', async (req, res) => {
  // Para Agregar un usuario a un bootcamp
});

// La Ruta para manejar rutas desconocidas
app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Ruta desconocida.");
});

// Para Iniciar el servidor
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
