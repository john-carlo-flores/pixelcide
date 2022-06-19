import chatIcon from "../../assets/icons/chat.svg";
import "../../styles/Game/Chat.scss";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../Button";
import crappyAvatar from "../../assets/avatars/2.png";
import moreCrappyDrawing from "../../assets/avatars/7.png";

const Chat = () => {
  const [toggleChat, setToggleChat] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const handleToggle = () => {
    setToggleChat((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatInput("");
  };

  const handleChange = (e) => {
    setChatInput(e.target.value);
  };

  return (
    <div className="Chat ">
      <AnimatePresence>
        {toggleChat && (
          <motion.div initial={{ y: 50 }} animate={{ y: -20 }} exit={{ y: 100, opacity: 0 }} className="outer-div">
            <div className="container">
              <div className="input ">
                <div className="avatar">
                  <img src={crappyAvatar} alt="" />
                </div>
                <div className="content ">Hey</div>
              </div>

              <div className="output ">
                <div className="content">What's up</div>
                <div className="avatar">
                  <img src={moreCrappyDrawing} alt="" />
                </div>
              </div>
              <div className="input ">
                <div className="avatar">
                  <img src={crappyAvatar} alt="" />
                </div>
                <div className="content ">Hey</div>
              </div>
              <div className="output ">
                <div className="content">What's up</div>
                <div className="avatar">
                  <img src={moreCrappyDrawing} alt="" />
                </div>
              </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} action="POST">
              <input type="text" onChange={(e) => handleChange(e)} value={chatInput} />
              <Button>SEND</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div onClick={handleToggle} className="chat-icon nes-pointer">
        <img src={chatIcon} alt="chat-icon" />
      </div>
    </div>
  );
};

export default Chat;
