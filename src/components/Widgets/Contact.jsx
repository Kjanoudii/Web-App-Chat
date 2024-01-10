import { useEffect } from "react";

// import { myContext } from './../Pages/ChatPage'
export default function Contact(prop) {

    const contact = prop.contact;

    useEffect(() => {
        const firstContact = document.querySelectorAll('.Chat-contact-list li')[0]
        firstContact.classList.add('selected')
    }, [])


    const handleClick = (key) => {
        // Remove 'selected' class from all list items
        const allContacts = document.querySelectorAll('.Chat-contact-list li');
        allContacts.forEach((contactElement) => {
            contactElement.classList.remove('selected');
        });

        // Add 'selected' class to the clicked item
        const clickedElement = document.getElementById(`contact-${key}`);

        clickedElement.classList.add('selected');

    };

    const lastMessage = (lastMessage) => {
        if (lastMessage.includes(
            "images%"
        ))
            return 'View Image'
        else if (lastMessage.includes(
            "audio%"
        )) return "Voice Message"


        else return lastMessage
    }




    return (
        <li id={`contact-${prop.myKey}`}
            onClick={() => {
                prop.display(contact.ContactID.toString());
                handleClick(prop.myKey)
            }}
        >
            <img className="user-img" src={contact.profile_pic} />
            <div className="contact-info">
                <h3 className="contact-name">{contact.name}</h3>
                <div className="last-message-container">
                    <p className="last-message-sent">
                        {lastMessage(contact.messages[contact.messages.length - 1].message)}
                    </p>
                    <p className="last-message-sent-time">
                        {contact.messages[contact.messages.length - 1].date.slice(12)}</p>
                </div>
            </div>
        </li>
    );
}
