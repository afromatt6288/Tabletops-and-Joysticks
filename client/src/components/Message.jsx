import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageEdit from "./MessageEdit"

function Message({ message, currentUser, onDeleteMessage, onUpdateMessage }) {
  const [isEditing, setIsEditing] = useState(false)
  
  const { id, username, sender_user_id, receiver_user_id, message_text, created_at } = message
  
/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

  function handleDeleteClick() {
    fetch(`api/messages/${id}`, {
      method: "DELETE"
    })    
    onDeleteMessage(id)
  }
  
  function handleUpdateMessage(updatedMessage) {
    setIsEditing(false)
    onUpdateMessage(updatedMessage)
  }

  return (
    <li>
      <span className="user">{currentUser.username}</span>
      <span className="time">{created_at}</span>
      {isEditing ? <MessageEdit id={id} message_text={message_text} onUpdateMessage={handleUpdateMessage} /> : <p>{message_text}</p>}
      {currentUser ? 
        <div>
          <button onClick={() => setIsEditing(isEditing => !isEditing)}>
            <span>✏️</span>
          </button>
          <button onClick={handleDeleteClick}>
            <span> 🗑 </span>
          </button>
        </div>
       : null}
    </li>
  );
}

export default Message;
