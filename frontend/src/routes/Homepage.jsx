import Button from "../components/Button";

export default function Homepage() {
  return (
    <div>
      <h1>This is the Homepage</h1>
      <Button primary>Sign Up</Button>
      <Button warning>Create Lobby</Button>
      <Button success>Start Game</Button>
      <Button error>Quit Game</Button>
    </div>
  );
}
