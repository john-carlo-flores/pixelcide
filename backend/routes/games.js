const router = require("express").Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("I AM HERE!");
    const { users, game } = req.body.session;
    const {status, number_of_moves, finished_at, started_at} = game;

    const command = `
      INSERT INTO games (status, number_of_moves, finished_at, started_at)
      VALUES
      ($1, $2, $3, $4)
      RETURNING *;
    `;
    db.query(command, [status, number_of_moves, finished_at, started_at])
      .then(data => {
        let counter = 2;
        let cmd = `
          INSERT INTO user_games(user_id, game_id)
          VALUES
        `;

        users.forEach(user => {
          cmd += `($${counter++}, $1),`
        });

        cmd = cmd.substring(0, cmd.length - 1) + ";";

        return db.query(cmd, [data.rows[0].id , ...users]);
      })
      .then((data) => {
        res.send('Game session saved!');
      })
      .catch(err => {
        console.log('Game session failed to save!\nError:', err.stack)
        res.send(err);
      })
  });

  return router;
};
