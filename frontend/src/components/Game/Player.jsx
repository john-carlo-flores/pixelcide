import PlayerField from "./PlayerField";
import PlayerDiscard from "./PlayerDiscard";
import PlayedCards from "./PlayedCards";
import PlayerHand from "./PlayerHand";

import { useEffect, useState } from "react";

import useSound from "use-sound";
import cardFlipSound from "../../assets/sounds/card-flip-.mp3";
import Avatar from "../Games/Avatar";

import "../../styles/Game/Player.scss";

const Player = (props) => {
  const {
    playerField,
    playerHand,
    playerDiscard,
    playedCards,
    playerName,
    avatar,
    status,
    bossSuit,
    moveCardTo,
    viewPlayed,
    owner,
    playerTurn,
  } = props;

  const [playOn] = useSound(cardFlipSound);

  const [view, setView] = useState("player-field");

  useEffect(() => {
    if (viewPlayed) {
      return setView("played-field");
    }

    if (status === "player_attack") {
      return setView("player-field");
    }
    if (status === "boss_attack") {
      return setView("player-discard");
    }
  }, [status, viewPlayed]);

  return (
    <>
      <div className="Player">
        {view === "player-field" && (
          <PlayerField
            playerField={playerField}
            moveCardTo={moveCardTo}
            status={status}
            bossSuit={bossSuit}
            playerTurn={playerTurn}
          />
        )}
        {view === "player-discard" && (
          <PlayerDiscard
            playerDiscard={playerDiscard}
            moveCardTo={moveCardTo}
            status={status}
            bossSuit={bossSuit}
            playerTurn={playerTurn}
          />
        )}
        {view === "played-field" && <PlayedCards playedCards={playedCards} />}
        <PlayerHand
          playerHand={playerHand}
          playerField={playerField}
          status={status}
          moveCardTo={moveCardTo}
          playOn={playOn}
          playerTurn={playerTurn}
        />
        <div className="player-info">
          <img
            src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/4719b98b6e86c3722d5407182d15547969c5d32d/frontend/src/assets/avatars/${avatar}.svg`}
            alt="user avatar"
          />
          {playerName}
        </div>
      </div>
    </>
  );
};

export default Player;
