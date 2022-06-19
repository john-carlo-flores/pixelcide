import chatIcon from "../../assets/icons/chat.svg";
import "../../styles/Game/Chat.scss";

const Chat = () => {
  return (
    <div className="Chat ">
      <div className="chat-icon nes-pointer">
        <img src={chatIcon} alt="" />
      </div>
    </div>
  );
};

export default Chat;
