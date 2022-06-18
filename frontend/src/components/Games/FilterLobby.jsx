import Button from "../Button";

import { useState } from "react";

import { AiOutlineClear } from "react-icons/ai";
import styles from "../../styles/Games/FilterLobby.module.scss";

const FilterLobby = (props) => {
  const [text, setText] = useState("");

  const { lobbies, setFilteredLobbies } = props;

  const filter = (event) => {
    event.preventDefault();

    const criteria = event.target.value;
    setText(criteria);
    setFilteredLobbies(
      lobbies.filter((lobby) => {
        return (
          lobby.host.toLowerCase().includes(criteria) ||
          lobby.title.toLowerCase().includes(criteria)
        );
      })
    );
  };

  const clear = (event) => {
    event.preventDefault();

    setText("");
    setFilteredLobbies(lobbies);
  };

  return (
    <div className={styles.container}>
      <input onChange={filter} value={text} />
      <Button onClick={clear}>
        <AiOutlineClear />
      </Button>
    </div>
  );
};

export default FilterLobby;
