import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import "../../styles/Leaderboard/Leaderboard.scss";
import axios from "axios";
import backBtn from "../../assets/icons/back.svg";
import { useEffect, useState } from "react";

const Leaderboard = (props) => {
  const { userAuth, user, logout, updateUserAvatar } = props;
  const [fetchComplete, setFetchComplete] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios.get("/leaderboard").then((response) => {
      setLeaderboardData(response.data);
      setFetchComplete(true);
    });
  }, []);

  return (
    <div className="Leaderboard">
      <Navbar updateUserAvatar={updateUserAvatar} userAuth={userAuth} user={user} logout={logout} />
      <div className="Homepage"></div>
      <Link to="/">
        <div className="back">
          <img className="back-btn" src={backBtn} alt="back button" />
        </div>
      </Link>
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">LEADERBOARD</h1>
        <div className="leaderboard-main">
          <section>
            <header>
              <div className="col">Rank</div>
              <div className="col">Username</div>
              <div className="col">Number of Wins</div>
              <div className="col">Win Percentage</div>
              <div className="col">Total moves</div>
            </header>
            <div className="body">
              {fetchComplete &&
                leaderboardData.map((user, i) => (
                  <div className="row" key={i}>
                    <div className="col">{user.rank}</div>
                    <div className="col">{user.username}</div>
                    <div className="col">{user.total_wins}</div>
                    <div className="col">{`${user.win_percentage.toFixed(2)}%`}</div>
                    <div className="col">{user.total_moves}</div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
