import Lobby from "./Lobby";

const LobbyList = (props) => {  
  const { lobbies } = props;
  
  const lobbyList = [];

  return (
    <div>
      {lobbyList}
    </div>
  );
};

export default LobbyList;