import Messages from "./Messages"
import Input from "../Control/Input"


export default function Chat(prop) {

    const { avatar, contactName }=prop


    return (
        <div className="Chat-chat">
         <div className="chat-heading">
         <img className="avatar" src={avatar}/>
            <h1 className="Chat-header">{contactName}</h1>
            </div>

            <Messages   />

            <Input
                type="text"
                placeholder="Type your message..."
                sentMessage={prop.sentMessage}
                newId={prop.newId}
            />
        </div>
    )
}


// function print() {

//     console.log(prop.inputValue)

//     setDisplay(true)

//     setArray(prevArray => [...prevArray, prop.inputValue]);
//     prop.setInputValue('');

// }