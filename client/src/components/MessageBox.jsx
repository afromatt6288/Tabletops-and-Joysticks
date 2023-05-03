import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageSearch from "./MessageSearch";
import MessageList from "./MessageList";
import MessageNew from "./MessageNew";

function MessageBox({users, currentUser, onSendMessage, onDeleteMessage, onEditMessage, currentUserSentMessages, onCurrentUserSentMessages, currentUserReceivedMessages, onCurrentUserReceivedMessages}) {
  const [search, setSearch] = useState("")

/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory()

  console.log(currentUserSentMessages)
  console.log(currentUserReceivedMessages)

  // This is what implements Tailwind... so DON'T delete it. 
  useEffect(() => {
    initTE({ Datepicker, Input, Select, Ripple });
  }, []); 
  
  function handleEditMessage(editedMessage) {
    onEditMessage(editedMessage)
  }

  const filteredMessages = currentUserSentMessages.concat(currentUserReceivedMessages)
  .filter(message => message.message_text.toLowerCase().includes(search.toLowerCase()))
  .map(message => ({
    message_text: message.message_text,
    sender_user_id: message.sender_user_id,
    receiver_user_id: message.receiver_user_id,
    created_At: message.created_At
  }));

  const userIds = new Set(filteredMessages.flatMap(message => [message.sender_user_id, message.receiver_user_id]));
  const filteredUsers = users.filter(user => userIds.has(user.id) && user.id !== currentUser.id);
  
  return (
    <main>
      <MessageSearch search={search} onSearchChange={setSearch} />
      <MessageList users={filteredUsers} messages={filteredMessages} currentUser={currentUser} onDeleteMessage={onDeleteMessage} onEditMessage={handleEditMessage} />
      <MessageNew currentUser={currentUser} onSendMessage={onSendMessage} />
    </main>
  );
}

export default MessageBox;