import Button from "../components/Button";
import "../styles/Navbar.scss";

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <a
        className="how-to-play"
        href="https://www.badgersfrommars.com/assets/RegicideRulesA4.pdf"
        target="_blank"
      >
        How to Play
      </a>

      <div className="navbar-right">
        {!props.user && <p className="login">Login</p>}
        {props.user && (
          <div className="user-logout">
            <p>Welcome {props.user} |</p>
            <p>&nbsp;Logout</p>
          </div>
        )}
      </div>
    </nav>
  );
}
