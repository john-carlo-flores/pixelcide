import Button from "../Button";
import Navbar from "../Navbar";
import "../../styles/Homepage.scss";

import { Link } from "react-router-dom";

export default function Homepage(props) {
  const { user, userAuth, logout } = props;

  return (
    <>
      <div className="Homepage"></div>
      <Navbar userAuth={userAuth} user={user} logout={logout} />
      <div className="Menu">
        <h1 className="Title">Pixelcide</h1>
        <div className="Buttons">
          {props.user && (
            <>
              <Link to="games/1"><Button error>Host Game</Button></Link>
              <Link to="games"><Button error>Join Game</Button></Link>
              <Link to="statistics"><Button error>Statistics</Button></Link>
              <Link to="leaderboard"><Button error>Leaderboard</Button></Link>
            </>
          )}
          {!props.user && <Button error>Sign Up</Button>}
        </div>
      </div>
    </>
  );
}
