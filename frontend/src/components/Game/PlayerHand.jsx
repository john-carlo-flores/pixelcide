import Card from "./Card";

import { playable } from "../../helpers/player-helpers";

import { motion } from "framer-motion";

const PlayerHand = (props) => {
  const { playerHand, playerField, status, moveCardTo, playOn, playerTurn } = props;

  const playableStatus = (card) => {
    if (status === "player_attack") {
      return playable(card, playerField);
    }

    return true;
  };

  const onClick = (card) => {
    if (!playerTurn) return;

    if (status === "boss_attack") {
      moveCardTo(card, "Discard", playableStatus(card), playOn);
    }

    if (status === "player_attack") {
      moveCardTo(card, "Field", playableStatus(card), playOn);
    }
  };

  const playerHandList = playerHand.map((card) => (
    <div
      key={card.id}
      onClick={() => onClick(card)}
      className={(status === "player_attack" && playable(card, playerField)) || status === "boss_attack" ? "player-card highlight nes-pointer" : "player-card dull"}
    >
      <Card image={card.image_front} />
    </div>
  ));

  return <div className="cards-container">{playerHandList}</div>;
};

export default PlayerHand;
