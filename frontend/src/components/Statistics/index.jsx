import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import backBtn from "../../assets/icons/back.svg";
import "../../styles/Statistics/statistics.scss";
import Avatar from "../Games/Avatar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Statistics = (props) => {
  const { userAuth, user, logout, updateUserAvatar } = props;

  const navigate = useNavigate();

  // If user not logged in redirect to root
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="Statspage">
      <Navbar
        updateUserAvatar={updateUserAvatar}
        userAuth={userAuth}
        user={user}
        logout={logout}
      />
      <div className="Homepage"></div>
      <Link to="/">
        <div className="back">
          <img className="back-btn" src={backBtn} alt="back button" />
        </div>
      </Link>
      <div className="Stats-container">
        <h1 className="Stats-title">{user?.username} stats</h1>
        <div className="avatar-container">
          <Avatar id={user?.avatar_id} />
        </div>
        <div className="nes-container is-rounded general-stats">
          <div className="one-stat">
            <span>Wins</span>
            <span>5</span>
          </div>
          <div className="one-stat">
            <span>Losses</span>
            <span>19</span>
          </div>
          <div className="one-stat">
            <span>Abandons</span>
            <span>1</span>
          </div>
          <div className="one-stat">
            <span>Win Rate</span>
            <span>20%</span>
          </div>
        </div>
        <div className="nes-container detailed-stats">
          <div className="outer-container">
            <div className="inner-container">
              <span>Total Moves: 1267</span>
              <span>Avg. Moves Per Game: 64</span>
              <span>Avg. Moves Per Boss: 3</span>
              <span>Number of Bosses Defeated: 122</span>
            </div>
            <div className="inner-container">
              <span>Number of Games Played: 123</span>
              <span>Achievment Points Earned: 10</span>
              <span>Max Damage Dealt: 30</span>
              <span>Max Damage Reduction: 22</span>
            </div>
          </div>
        </div>
        <div className="achievements-container">
          <div className="achievements-title">ACHIEVEMENTS</div>

          <div className="inner-container">
            <div className="nes-container is-rounded achievements">
              100 Games Played
            </div>
            <div className="nes-container is-rounded achievements">
              No Jesters Played
            </div>
            <div className="nes-container is-rounded achievements">
              50 Games with Friends
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
