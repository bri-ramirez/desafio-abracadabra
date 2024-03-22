const express = require('express');
const app = express();
const PORT = 3000;
const usuarios = [
  'Juan',
  'Jocelyn',
  'Astrid',
  'Maria',
  'Ignacia',
  'Javier',
  'Brian',
];

const verificarUsuario = (req, res, next) => {
  const usuario = req.params.usuario;
  if (usuarios.includes(usuario)) {
    next();
  } else {
    res.status(404).sendFile(__dirname + '/public/user-not-found.html');
  }
};

app.use(express.static('public'));

app.get('/abracadabra/usuarios', (req, res) => {
  res.json({
    usuarios: usuarios,
  });
});

app.get('/abracadabra/juego/:usuario', verificarUsuario, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/abracadabra/conejo/:n', (req, res) => {
  const n = parseInt(req.params.n);
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  if (n === randomNumber) {
    res.sendFile(__dirname + '/public/winner.html');
  } else {
    res.sendFile(__dirname + '/public/loser.html');
  }
});

app.get('*', (req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
