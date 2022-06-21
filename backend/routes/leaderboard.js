const router = require("express").Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const command = `WITH scores as
    (
    select rank() over(order by sum(case when status = 'WIN' then 1 else 0 end) DESC, sum(case when status = 'WIN' then 1 else 0 end)::FLOAT / count(*)::FLOAT DESC, sum(number_of_moves) ASC) as rank,
    u.username,
    sum(case when status = 'WIN' then 1 else 0 end) as total_wins,
    count(*) as total_games,
    (sum(case when status = 'WIN' then 1 else 0 end)::FLOAT / count(*)::FLOAT) * 100 as win_percentage,
    sum(number_of_moves) as total_moves
    from user_games ug
    inner join games g on ug.game_id = g.id
    inner join users u on ug.user_id = u.id
    group by u.username
    )
    select * 
    from scores where rank <=10;`;
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
