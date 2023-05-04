import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageSearch from "./MessageSearch";
import MessageList from "./MessageList";
import MessageNew from "./MessageNew";

function MessageBox({users, currentUser, onSendMessage, onDeleteMessage, onEditMessage, currentUserSentMessages, onCurrentUserSentMessages, currentUserReceivedMessages, onCurrentUserReceivedMessages}) {
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState(null);

/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory()

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
    id: message.id,
    message_text: message.message_text,
    sender_user_id: message.sender_user_id,
    receiver_user_id: message.receiver_user_id,
    created_at: message.created_at
  }));

  const userIds = new Set(filteredMessages.flatMap(message => [message.sender_user_id, message.receiver_user_id]));
  const filteredUsers = users.filter(user => userIds.has(user.id) && user.id !== currentUser.id);
  
  const usersWithMessageHistory = filteredUsers.map((user) => {
    const userMessages = filteredMessages.filter(message => message.sender_user_id === user.id || message.receiver_user_id === user.id);
    return { ...user, messages: userMessages };
  });
  
  const selectedUserMessages = selectedUser ? 
    selectedUser.messages.filter(message => message.message_text.toLowerCase().includes(search.toLowerCase()))
  : [];
  
  return (
    <main>
      {selectedUser ? 
        <div>
          <button onClick={() => setSelectedUser(null)}>Back</button>
          <MessageSearch search={search} onSearchChange={setSearch} />
          <MessageList user={selectedUser} messages={selectedUserMessages} currentUser={currentUser} onDeleteMessage={onDeleteMessage} onEditMessage={handleEditMessage} />
        </div> 
      : 
        <>
          <MessageSearch search={search} onSearchChange={setSearch} />
          <ul>
            {usersWithMessageHistory.map((user) => (
              <li key={user.id}>
                <button onClick={() => setSelectedUser(user)}>
                  {user.username}
                </button>
              </li>
            ))}
          </ul>
          <MessageNew currentUser={currentUser} onSendMessage={onSendMessage} />
        </>
      }
    </main>
  );
}

export default MessageBox;