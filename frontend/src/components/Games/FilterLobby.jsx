import Button from "../Button";

import { useState } from "react";

import { AiOutlineClear } from "react-icons/ai";

const FilterLobby = (props) => {
  const [text, setText ] = useState('');

  const { lobbies } = props;

  const filter = (event) => {
    event.preventDefault();

  };

  return (
    <div>
      <input onChange={filter} value={text} />
      <Button><AiOutlineClear /></Button>
    </div>
  ) ; 
};

export default FilterLobby;