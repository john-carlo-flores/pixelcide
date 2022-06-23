module.exports = (game, db) => {
  const { users, status, number_of_moves, finished_at, started_at } = game;

  const command = `
      INSERT INTO games (status, number_of_moves, finished_at, started_at)
      VALUES
      ($1, $2, $3, $4)
      RETURNING *;
    `;
  db.query(command, [status, number_of_moves, finished_at, started_at])
    .then((data) => {
      let counter = 2;
      let cmd = `
          INSERT INTO user_games(user_id, game_id)
          VALUES
        `;

      users.forEach((user) => {
        cmd += `($${counter++}, $1),`;
      });

      cmd = cmd.substring(0, cmd.length - 1) + ";";

      return db.query(cmd, [data.rows[0].id, ...users]);
    })
    .catch((err) => {
      console.log("Game session failed to save!\nError:", err.stack);
      s;
    });
};
