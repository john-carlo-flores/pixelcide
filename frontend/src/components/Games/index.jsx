import { Link } from "react-router-dom";

const Games = () => {
  return(
    <>
      <h1>This is the lobby selection list where users game select which game lobby to join or spectate.</h1>
      <Link to="/">Back to home page</Link>
    </>
  );
};

export default Games;