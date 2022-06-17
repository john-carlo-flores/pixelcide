import LobbyList from "./LobbyList";
import Navbar from "../Navbar";

import { Link } from "react-router-dom";

import styles from "../../styles/Games/Games.module.scss";

const Games = (props) => {
  const { userAuth, user, logout } = props;

  return(
    <>
      <div className={styles.Homepage}></div>
      <Navbar userAuth={userAuth} user={user} logout={logout} />
      <LobbyList />
      <Link to="/">Back to home page</Link>
    </>
  );
};

export default Games;