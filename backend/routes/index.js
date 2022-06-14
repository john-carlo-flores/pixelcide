var router = require('express').Router();

const { generateAccessToken, generateRefreshToken, verify } = require('../helpers/authentication');
let refreshTokens = [];

module.exports = (db) => {
  /* GET home page. */
  router.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Pixelcide API' });
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body.user;
    
    const command = `
      SELECT * FROM USERS WHERE username = $1
    `;

    db.query(command, [username])
      .then(data => {
        const { id, username, name, password_digest, avatar_id } = data.rows[0];

        if (password === password_digest) {
          const accessToken = generateAccessToken(id);
          const refreshToken = generateRefreshToken(id);
          return res.json({ username, name, avatar_id, accessToken, refreshToken });
        }
        
        res.status(400).json("Username and/or password is incorrect");
      })
      .catch(err => {
        res.status(400).json("User information invalid");
      })
  });

  router.post('/logout', verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.status(200).json("You logged out successfully");
  });

  return router;
};