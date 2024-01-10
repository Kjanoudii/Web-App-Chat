import { useContext } from "react";
import { myContext } from "./../Pages/ChatPage";

export default function Messages() {
    const { newSelectedMessages, contactsDb } = useContext(myContext);

console.log(contactsDb[0])
  
    function getMessageClassName(messageType) {
        if (messageType.startsWith("sent-audio")) {
            return "Chat-message sent-audio";
        } else if (messageType.startsWith("sent")) {
            return "Chat-message sent";
        } else if (messageType.startsWith("received")) {
            return "Chat-message received";
        } else {
            return ""; // Default case or any other handling
        }
    }

    function isLastIndex(array, index) {
        return index === array.length - 1;
    }

    return (
        <>
            <div className="message-container">
                {newSelectedMessages.map((message, index) => (
                    <div
                        key={index}
                        className={getMessageClassName(message.type) +
                            (isLastIndex(newSelectedMessages, index) ? " last-message" : "")}
                    >
                        {message.type === "sent-img" ? (
                            <div>
                                <img
                                    src={message.message}
                                    alt="Sent Image"
                                    className={`message-${message.type}`}
                                />
                                <p className='message-time-sent'>{message.date.slice(11)}</p>
                            </div>
                        ) : message.type === "sent-audio" ? (
                            <div className="sent-audio">
                                <audio className="sent-audio"controls>
                                    <source src={message.message} type="audio/mpeg" />
                                    
                                </audio>
                                <p className='message-time'>{message.date.slice(11)}</p>
                            </div>
                        ) : (
                            <div>
                                <p className={`message-${message.type}-txt`}>{message.message}</p>
                                <p className={message.type === 'sent' ? 'message-time-sent' : 'message-time'}>
                                    {message.date.slice(11)}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
