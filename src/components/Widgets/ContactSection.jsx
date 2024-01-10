

import Contacts from './Contacts';

// const [isSelected, setIsSelected] = useState(false);

function ContactList(prop) {
  
     // console.log(contactsArray)

    const id = prop.id
    const displayMessages = prop.displayMessages

    return (
        <Contacts
            
            displayMessages={displayMessages}
            id={id}
            getDate={prop.getDate}
            contactsArray={prop.contactsArray}
          
        />
    )
}

export default ContactList;













