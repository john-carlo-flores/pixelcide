import chatIcon from "../../assets/icons/chat.svg";
import "../../styles/Game/Chat.scss";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import Button from "../Button";
import Avatar from "../Games/Avatar";

const Chat = (props) => {
  const { user, messages, sendMessage } = props;
  //to check click outside the chat component
  const ref = useRef();

  const [toggleChat, setToggleChat] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const handleToggle = () => {
    setToggleChat((prev) => !prev);
  };

  const handleSubmit = (e) => {
    // chatInput && setUserChat([chatInput, ...userChat]);
    chatInput &&
      sendMessage({
        id: user.id,
        message: chatInput,
        avatar_id: user.avatar_id,
      });
    e.preventDefault();
    setChatInput("");
  };

  const handleChange = (e) => {
    setChatInput(e.target.value);
  };

  const messageList = messages.map((chat, i) => {
    return chat.id === user.id ? (
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        key={i}
        className={chat.id === user.id ? "input" : "output"}
      >
        <div className="avatar">
          <Avatar id={chat.avatar_id} />
        </div>
        <div className="content ">{chat.message}</div>
      </motion.div>
    ) : (
      <motion.div
        layout
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="output "
      >
        <div className="content">{chat.message}</div>
        <div className="avatar">
          <Avatar id={chat.avatar_id} />
        </div>
      </motion.div>
    );
  });

  useOnClickOutside(ref, () => setToggleChat(false));
  return (
    <div className="Chat" ref={ref}>
      <AnimatePresence>
        {toggleChat && (
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: -200 }}
            exit={{ y: 10, opacity: 0 }}
            className="outer-div nes-container is-rounded"
          >
            <div className="container">{messageList}</div>
            <form onSubmit={(e) => handleSubmit(e)} action="POST">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                value={chatInput}
              />
              <Button>SEND</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.2 }}
        onClick={handleToggle}
        className={
          toggleChat ? "chat-icon nes-pointer glow" : "chat-icon nes-pointer"
        }
      >
        <img src={chatIcon} alt="chat-icon" />
      </motion.div>
    </div>
  );
};

export default Chat;
