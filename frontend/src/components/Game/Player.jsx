import PlayerField from "./PlayerField";
import PlayerDiscard from "./PlayerDiscard";
import PlayedCards from "./PlayedCards";
import PlayerHand from "./PlayerHand";
import PlayerSelect from "./PlayerSelect";

import { useEffect, useState } from "react";

import useSound from "use-sound";
import cardFlipSound from "../../assets/sounds/card-flip-.mp3";
import Avatar from "../Games/Avatar";

import "../../styles/Game/Player.scss";

const Player = (props) => {
  const { index, player, status, bossSuit, jesterActive, moveCardTo, owner, playerTurn, handleCommands } = props;

  const [playOn] = useSound(cardFlipSound);

  const [view, setView] = useState("player-field");

  useEffect(() => {
    if (!playerTurn && status !== "select_player") {
      return setView("played-field");
    }
    if (status === "player_attack") {
      return setView("player-field");
    }
    if (status === "boss_attack") {
      return setView("player-discard");
    }
    if (status === "select_player") {
      return setView("player-select");
    }
  }, [status]);

  return (
    <div className="Player">
      {view === "player-field" && (
        <PlayerField playerField={player.field} moveCardTo={moveCardTo} status={status} bossSuit={bossSuit} jesterActive={jesterActive} playerTurn={playerTurn} owner={owner} />
      )}
      {view === "player-discard" && (
        <PlayerDiscard playerDiscard={player.discard} moveCardTo={moveCardTo} status={status} bossSuit={bossSuit} playerTurn={playerTurn} owner={owner} />
      )}
      {view === "player-select" && <PlayerSelect onSelect={() => handleCommands("Select", index)} playerTurn={playerTurn} />}
      {view === "played-field" && <PlayedCards playedCards={player.played} />}
      <PlayerHand playerHand={player.hand} playerField={player.field} status={status} moveCardTo={moveCardTo} playOn={playOn} playerTurn={playerTurn} owner={owner} />
      <div className="player-info">
        <Avatar id={player.avatar_id} />
        {player.username}
        <div title="Card count" className="card-count">
          {player.hand.length}
        </div>
      </div>
    </div>
  );
};

export default Player;
