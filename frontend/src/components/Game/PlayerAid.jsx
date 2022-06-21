import "../../styles/Game/PlayerAid.scss";

import { useState, useEffect } from "react";

import _ from "lodash";

import { BsFillSuitClubFill } from "react-icons/bs";
import { BsFillSuitSpadeFill } from "react-icons/bs";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BsFillDiamondFill } from "react-icons/bs";
import { GiJesterHat } from "react-icons/gi";

const PlayerAid = ({ playerField, status, jesterActive, bossSuit }) => {
  const [toggleRow, setToggleRow] = useState([]);

  useEffect(() => {
    if (status === "player_attack") {
      const currentCards = [];
      for (const card of playerField) {
        currentCards.push(card.suit);
      }

      const triggerRow = (suit) => {
        setToggleRow([...toggleRow, suit]);
      };

      if (currentCards.at(-1) === "Clubs") {
        triggerRow("Clubs");
      }
      if (currentCards.at(-1) === "Spades") {
        triggerRow("Spades");
      }
      if (currentCards.at(-1) === "Diamonds") {
        triggerRow("Diamonds");
      }
      if (currentCards.at(-1) === "Hearts") {
        triggerRow("Hearts");
      }
      if (!_.isEqual(toggleRow, currentCards)) {
        setToggleRow(currentCards);
      }
    }

    if (status === "boss_attack") {
      setToggleRow([]);
    }

    if (status === "player_turn") {
      setToggleRow([]);
    }
  }, [playerField, status]);

  return (
    <div className="PlayerAid">
      <div
        className={
          toggleRow.includes("Clubs")
            ? "PlayerAid-row open-row "
            : "PlayerAid-row "
        }
      >
        <div
          className={
            toggleRow.includes("Clubs")
              ? "animated tada nes-pointer"
              : " nes-pointer"
          }
        >
          <BsFillSuitClubFill size={35} color={"#309c63"} />
        </div>
        <div
          className={
            bossSuit === "Clubs" && !jesterActive ? "strike green" : "green"
          }
        >
          Deal Double Damage
        </div>
      </div>

      <div
        className={
          toggleRow.includes("Spades")
            ? "PlayerAid-row open-row"
            : "PlayerAid-row"
        }
      >
        <div
          className={
            toggleRow.includes("Spades")
              ? "animated tada nes-pointer"
              : "nes-pointer"
          }
        >
          <BsFillSuitSpadeFill size={35} color={"#8e478c"} />
        </div>
        <div
          className={
            bossSuit === "Spades" && !jesterActive ? "strike purple" : "purple"
          }
        >
          {" "}
          Reduce Boss Attack
        </div>
      </div>

      <div
        className={
          toggleRow.includes("Hearts")
            ? "PlayerAid-row open-row"
            : "PlayerAid-row"
        }
      >
        <div
          className={
            toggleRow.includes("Hearts")
              ? "animated tada nes-pointer"
              : "nes-pointer"
          }
        >
          <BsFillSuitHeartFill size={35} color={"#c93038"} />
        </div>
        <div
          className={
            bossSuit === "Hearts" && !jesterActive ? "strike red" : "red"
          }
        >
          Heal Tavern Deck
        </div>
      </div>

      <div
        className={
          toggleRow.includes("Diamonds")
            ? "PlayerAid-row open-row"
            : "PlayerAid-row"
        }
      >
        <div
          className={
            toggleRow.includes("Diamonds")
              ? "animated tada nes-pointer"
              : "nes-pointer"
          }
        >
          <BsFillDiamondFill size={35} color={"#3978a8"} />
        </div>
        <div
          className={
            bossSuit === "Diamonds" && !jesterActive ? "strike blue" : "blue"
          }
        >
          Draw Tavern Card
        </div>
      </div>

      <div
        className={jesterActive ? "PlayerAid-row open-row" : "PlayerAid-row"}
      >
        <div
          className={jesterActive ? "animated tada nes-pointer" : "nes-pointer"}
        >
          <GiJesterHat size={35} color={"#c93038"} />
        </div>
        <div className="red">
          <span className="green">J</span>
          <span className="purple">e</span>
          <span className="red">s</span>
          <span className="blue">t</span>
          <span className="green">e</span>
          <span className="purple">r</span>
          <span>&nbsp;</span>
          <span className="red ">A</span>
          <span className="blue">c</span>
          <span className="green">t</span>
          <span className="purple">i</span>
          <span className="red">v</span>
          <span className="blue">a</span>
          <span className="green">t</span>
          <span className="purple">e</span>
          <span className="red">d</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerAid;
