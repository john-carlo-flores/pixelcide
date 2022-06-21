import Player from "./Player";
import Button from "../Button";

import { useState } from "react";

import { FaRegEye } from "react-icons/fa";
import "../../styles/Game/PlayerList.scss";

const PlayerList = (props) => {
  const { players, user, moveCardTo, status, bossSuit, currentPlayer } = props;
  const [viewPlayed, setViewPlayed] = useState(false);

  const playerList = players.map((player) => {
    return (
      <div className="PlayerList">
        <Player
          key={player.id}
          playerField={player.field}
          playerHand={player.hand}
          playerDiscard={player.discard}
          playedCards={player.played}
          playerName={player.username}
          avatar={user.avatar_id}
          status={status}
          bossSuit={bossSuit}
          moveCardTo={moveCardTo}
          viewPlayed={viewPlayed}
          owner={user.id === player.id}
          playerTurn={currentPlayer.id === player.id}
        />
      </div>
    );
  });

  return (
    <div>
      <div className="view-played">
        <Button
          onMouseDown={() => setViewPlayed(true)}
          onMouseUp={() => setViewPlayed(false)}
          warning
        >
          <FaRegEye size={25} />
        </Button>
      </div>
      <div className="PlayerList">{playerList}</div>
    </div>
  );
};

export default PlayerList;
