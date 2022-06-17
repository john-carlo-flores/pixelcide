import Lobby from "./Lobby";
import FilterLobby from "./FilterLobby";

const LobbyList = (props) => {  

  const lobbyList = [];

  return (
    <div>
      <FilterLobby />
      {lobbyList}
    </div>
  );
};

export default LobbyList;