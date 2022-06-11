import Button from "../Button";
import Navbar from "../Navbar";
import "../../styles/Homepage.scss";

export default function Homepage() {
  return (
    <div className="Homepage">
      <Navbar />
      <div>logged in version</div>
      <Navbar user="Mo" />
      <Button primary>Sign Up</Button>
      <Button warning>Create Lobby</Button>
      <Button success>Start Game</Button>
      <Button error>Quit Game</Button>
    </div>
  );
}
