import Button from "../Button";

import { useNavigate } from "react-router-dom";
import styles from "../../styles/Root/LobbyCreation.module.scss";

const LobbyCreation = (props) => {
  const { assignTitle, onCancel, link } = props; 
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    assignTitle(event.target.title.value);

    navigate(`/games/${link}`);
  };

  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <form className="nes-container is-rounded" onSubmit={onSubmit}>
          <div className="nes-field">
            <label>Room Name:</label>
            <input className="nes-input is-inline" type="text" name="title" required />
          </div>
          <div className={styles.buttonContainer}>
            <Button success>Create Room</Button>
            <Button onClick={onCancel} error>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LobbyCreation;