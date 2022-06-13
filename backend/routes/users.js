const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  router.post("/", (req, res) => {
    const { username, name, email, password_digest, avatar_id } = req.body.user;
    const command = `
    INSERT INTO users (username, name, email, password_digest, avatar_id)
    VALUES
    ($1, $2, $3, $4, $5);
    `;
    db.query(command, [username, name, email, password_digest, avatar_id])
      .then((data) => {
        res.send("User Saved");
      })
      .catch((err) => {
        res.send(err);
      });
  });
  return router;
};
