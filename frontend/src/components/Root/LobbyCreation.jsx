import Button from "../Button";

import styles from "../../styles/Root/LobbyCreation.module.scss";

const LobbyCreation = (props) => {
  const { onCancel, onCreate } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    onCreate(event.target.title.value);
  };

  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <form className="nes-container is-rounded" onSubmit={onSubmit}>
          <div className="nes-field">
            <label>Room Name:</label>
            <input
              className="nes-input is-inline"
              type="text"
              name="title"
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button success>Create Room</Button>
            <Button onClick={onCancel} error>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LobbyCreation;
