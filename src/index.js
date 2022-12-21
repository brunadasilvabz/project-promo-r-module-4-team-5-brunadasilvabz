// Fichero src/index.js

//random number para el id
const randomId = () => {
  return Math.random();
};
// Importamos los dos módulos de NPM necesarios para trabajar
const express = require('express');
const cors = require('cors');

// Creamos el servidor
const server = express();

// Configuramos el servidor
server.use(cors());
server.use(express.json({ limit: '25mb' }));

// Arrancamos el servidor en el puerto 4000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
const savedCards = [];
// Escribimos los endpoints que queramos
server.post('/card', (req, res) => {
  if (
    req.body.palette === '' ||
    req.body.name === '' ||
    req.body.job === '' ||
    req.body.photo === '' ||
    req.body.linkedin === '' ||
    req.body.github === '' ||
    req.body.email === ''
  ) {
    const responseError = {
      error: 'Faltan datos',
      success: false,
    };
    res.json(responseError);
  } else {
    const newCard = {
      id: randomId(),
      ...req.body,
    };
    savedCards.push(newCard);
    const responseSuccess = {
      cardURL: `http://localhost:4000/card/${newCard.id}`,
      success: true,
    };
    res.json(responseSuccess);
  }
});

//FALTA POR AÑADIR ERROR TAMAÑO FOTO

const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));
