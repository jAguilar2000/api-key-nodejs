const express = require('express');
const app = express();
const port = 4000;
const API = require('./apiAuth');
const connection = require('./db');

// Manejar JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({ data: { message: 'You can get a list of movies at /api/peliculas.' } });
});

app.post('/api/register', (req, res) => {
  const username = req.body.username;
  API.createUser(username, req, (err, user) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to register user.' });
    }
    res.status(201).send({ data: user });
  });
});

// Obtener todas las películas
app.get('/api/peliculas', API.authenticateKey, (req, res) => {
  const query = 'SELECT * FROM peliculas';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send({ error: 'Database error.', details: err.message });
    }
    res.status(200).send({ data: results });
  });
});

// Crear una nueva película
app.post('/api/peliculas', API.authenticateKey, (req, res) => {
  const { generoId, titulo, sinopsis, fechaLanzamiento, activo } = req.body;
  const query = 'INSERT INTO peliculas (generoId, titulo, sinopsis, fechaLanzamiento, activo) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [generoId, titulo, sinopsis, fechaLanzamiento, activo], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send({ error: 'Database error.', details: err.message });
    }

    const newPelicula = {
      peliculaId: results.insertId,
      generoId,
      titulo,
      sinopsis,
      fechaLanzamiento,
      activo,
    };

    res.status(201).send({ data: newPelicula });
  });
});

// Actualizar una película existente
app.put('/api/peliculas/:id', API.authenticateKey, (req, res) => {
  const { id } = req.params;
  const { generoId, titulo, sinopsis, fechaLanzamiento, activo } = req.body;
  const query = 'UPDATE peliculas SET generoId = ?, titulo = ?, sinopsis = ?, fechaLanzamiento = ?, activo = ? WHERE peliculaId = ?';

  connection.query(query, [generoId, titulo, sinopsis, fechaLanzamiento, activo, id], (err) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send({ error: 'Database error.', details: err.message });
    }

    res.status(200).send({ message: 'Pelicula updated successfully.' });
  });
});

// Eliminar una película
app.delete('/api/peliculas/:id', API.authenticateKey, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM peliculas WHERE peliculaId = ?';

  connection.query(query, [id], (err) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send({ error: 'Database error.', details: err.message });
    }

    res.status(200).send({ message: 'Pelicula deleted successfully.' });
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error('Failure to launch server');
    return;
  }
  console.log(`Listening on port ${port}`);
});
