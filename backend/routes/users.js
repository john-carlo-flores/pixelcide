const router = require("express").Router();
const {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} = require("../helpers/authentication");

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  router.post("/", async (req, res) => {
    const { username, name, email, password, avatar_id } = req.body.user;
    const password_digest = await hashPassword(password);

    const command = `
    INSERT INTO users (username, name, email, password_digest, avatar_id)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *;
    `;
    db.query(command, [username, name, email, password_digest, avatar_id])
      .then((data) => {
        const user = {
          id: data.rows[0].id,
          username: data.rows[0].username,
          name: data.rows[0].name,
          avatar_id: data.rows[0].avatar_id,
          accessToken: generateAccessToken(data.rows[0].id),
          refreshToken: generateRefreshToken(data.rows[0].id),
        };

        res.status(200).json({ ...user });
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router.put("/", (req, res) => {
    const { avatar_id, id } = req.body.user;

    const command = `UPDATE users SET avatar_id=$1 where id = $2;`;

    db.query(command, [avatar_id, id]).then(() => {
      res.send("User Updated");
    });
  });
  return router;
};
