import Button from "../Button";

import styles from "../../styles/Root/LobbyCreation.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import { useRef } from "react";

const LobbyCreation = (props) => {
  const { onCancel, onCreate } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    onCreate(event.target.title.value);
  };

  const ref = useRef();
  useOnClickOutside(ref, onCancel);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.background}>
        <div className={styles.form} ref={ref}>
          <form className="nes-container is-rounded" onSubmit={onSubmit}>
            <motion.div initial={{ zoom: -1 }} animate={{ zoom: 1 }} exit={{ zoom: -1 }} className="nes-field">
              <label>Room Name:</label>
              <input className="nes-input is-inline" type="text" name="title" required />
            </motion.div>
            <div className={styles.buttonContainer}>
              <Button success>Create Room</Button>
              <Button onClick={onCancel} error>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LobbyCreation;
