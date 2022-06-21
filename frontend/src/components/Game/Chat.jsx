import chatIcon from "../../assets/icons/chat.svg";
import "../../styles/Game/Chat.scss";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import Button from "../Button";
import Avatar from "../Games/Avatar";

const Chat = () => {
  //to check click outside the chat component
  const ref = useRef();

  const [toggleChat, setToggleChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [userChat, setUserChat] = useState([]);

  const handleToggle = () => {
    setToggleChat((prev) => !prev);
  };

  const handleSubmit = (e) => {
    chatInput && setUserChat([chatInput, ...userChat]);
    e.preventDefault();
    setChatInput("");
  };

  const handleChange = (e) => {
    setChatInput(e.target.value);
  };

  useOnClickOutside(ref, () => setToggleChat(false));
  return (
    <div className="Chat" ref={ref}>
      <AnimatePresence>
        {toggleChat && (
          <motion.div initial={{ y: 50 }} animate={{ y: -20 }} exit={{ y: 100, opacity: 0 }} className="outer-div nes-container is-rounded">
            <div className="container">
              {userChat.map((chat, i) => (
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} key={i} className="input ">
                  <div className="avatar">
                    <Avatar id={6} />
                  </div>
                  <div className="content ">{chat}</div>
                </motion.div>
              ))}

              <motion.div layout initial={{ y: 20 }} animate={{ y: 0 }} className="output ">
                <div className="content">What's up</div>
                <div className="avatar">
                  <Avatar id={4} />
                </div>
              </motion.div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} action="POST">
              <input type="text" onChange={(e) => handleChange(e)} value={chatInput} />
              <Button>SEND</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div onClick={handleToggle} className={toggleChat ? "chat-icon nes-pointer glow" : "chat-icon nes-pointer"}>
        <img src={chatIcon} alt="chat-icon" />
      </div>
    </div>
  );
};

export default Chat;
