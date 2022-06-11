import Button from "../Button";
import Navbar from "../Navbar";
import "../../styles/Homepage.scss";

export default function Homepage(props) {
  const { user, onClick } = props;

  return (
    <>
      <div className="Homepage"></div>
      <Navbar onClick={onClick} user={user} />
      <div className="Menu">
        <h1 className="Title">Pixelcide</h1>
        <div className="Buttons">
          {props.user && (
            <>
              <Button error>Host Game</Button>
              <Button error>Join Game</Button>
              <Button error>Statistics</Button>
              <Button error>Leaderboard</Button>
            </>
          )}
          {!props.user && <Button error>Sign Up</Button>}
        </div>
      </div>
    </>
  );
}
