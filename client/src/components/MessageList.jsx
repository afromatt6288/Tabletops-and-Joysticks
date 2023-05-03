import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import Message from "./Message";

function MessageList({ users, messages, currentUser, onDeleteMessage, onUpdateMessage }) {
  
/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory()

  // This is what implements Tailwind... so DON'T delete it. 
  useEffect(() => {
    initTE({ Datepicker, Input, Select, Ripple });
  }, []);

  return (
    <div className="list">
      <ul>{messages.map(message => {
        const user = users.find(user => user.id === message.sender_user_id || user.id === message.receiver_user_id);
        return (
          <Message key={message.id} users={users} message={message} user={user} currentUser={currentUser} onDeleteMessage={onDeleteMessage} onUpdateMessage={onUpdateMessage} />
        );
      })}
      </ul>
    </div>
  );
}

export default MessageList;