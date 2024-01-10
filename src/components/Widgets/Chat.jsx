import Messages from "./Messages";
import Input from "../Control/Input";

export default function Chat(prop) {
  const { avatar, contactName, backGroundStyle } = prop;
 
  return (
    <div className="Chat-chat">
      <div className="chat-heading" style={backGroundStyle}>
        <img className="avatar" src={avatar} />
        <h1 className="Chat-header">{contactName}</h1>
      </div>

      <Messages />

      <Input
        type="text"
        placeholder="Type your message..."
        sentMessage={prop.sentMessage}
        newId={prop.newId}
      />
    </div>
  );
}
