// testPeliculas.js
const connection = require('./db');

connection.query('SELECT * FROM peliculas', (err, results) => {
  if (err) {
    console.error('Error querying peliculas:', err);
    return;
  }
  console.log('Peliculas:', results);
  connection.end();
});
