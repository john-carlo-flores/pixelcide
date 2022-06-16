var router = require('express').Router();

const { generateAccessToken, generateRefreshToken, verify, validRefreshToken, verifyPassword, hashPassword } = require('../helpers/authentication');
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

        verifyPassword(password, password_digest)
          .then(result => {
            if (result) {
              const accessToken = generateAccessToken(id);
              const refreshToken = generateRefreshToken(id);
              return res.status(200).json({ id, username, name, avatar_id, accessToken, refreshToken });
            }

            res.status(400).json("Username and/or password is incorrect");
          });      
      })
      .catch(err => {
        console.log(err);
        res.status(400).json("User information invalid");
      })
  });

  router.post('/logout', verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);

    return res.status(200).json("You logged out successfully");
  });

  router.post('/refresh', (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }

    const user = validRefreshToken(refreshToken);
    if (user) {
      refreshTokens = refreshTokens.filter(token => token != refreshToken);
      
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });

    }
  });

  return router;
};