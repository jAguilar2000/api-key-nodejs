// apiAuth.js
const connection = require('./db');
const MAX = 25;

const genAPIKey = () => {
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};

const createUser = (_username, req, callback) => {
  const apiKey = genAPIKey();
  const query = 'INSERT INTO usuarios (api_key, username) VALUES (?, ?)';

  connection.query(query, [apiKey, _username], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return callback(err, null);
    }

    const user = {
      id: results.insertId,
      api_key: apiKey,
      username: _username,
    };

    callback(null, user);
  });
};

const authenticateKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).send({ error: 'API key is missing.' });
  }

  const query = 'SELECT * FROM usuarios WHERE api_key = ?';
  connection.query(query, [apiKey], (err, results) => {
    if (err) {
      console.error('Error querying users:', err);
      return res.status(500).send({ error: 'Database error.', details: err.message });
    }

    if (results.length === 0) {
      return res.status(403).send({ error: { code: 403, message: 'You are not allowed.' } });
    }

    next();
  });
};

module.exports = { createUser, authenticateKey };
