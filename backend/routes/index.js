var router = require('express').Router();


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

        res.send(`Success! User ID is ${id}`);
      })
      .catch(err => {
        res.status(400).json("Username and/or password is incorrect");
      })
  });

  return router;
};

