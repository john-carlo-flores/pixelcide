import PlayerField from "./PlayerField";
import PlayerDiscard from "./PlayerDiscard";
import PlayedCards from "./PlayedCards";
import PlayerHand from "./PlayerHand";

import { useEffect, useState } from "react";

import useSound from "use-sound";
import cardFlipSound from "../../assets/sounds/card-flip-.mp3";

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
  } = props;

  const [playOn] = useSound(cardFlipSound);

  const [view, setView] = useState("");

  useEffect(() => {
    if (status === "player_attack") {
      setView("player-field");
    }
    if (status === "boss_attack") {
      setView("player-discard");
    }
  }, [status]);

  return (
    <>
      <PlayedCards playedCards={playedCards} />
      <div className="Player">
        {view === "player-field" && (
          <PlayerField
            playerField={playerField}
            moveCardTo={moveCardTo}
            status={status}
            bossSuit={bossSuit}
          />
        )}
        {view === "player-discard" && (
          <PlayerDiscard
            playerDiscard={playerDiscard}
            moveCardTo={moveCardTo}
            status={status}
            bossSuit={bossSuit}
          />
        )}

        <PlayerHand
          playerHand={playerHand}
          status={status}
          moveCardTo={moveCardTo}
          playOn={playOn}
        />
        <div className="player-info">
          <img
            src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/${avatar}.png`}
            alt="user avatar"
          />
          {playerName}
        </div>
      </div>
    </>
  );
};

export default Player;
