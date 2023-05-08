import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageSearch from "./MessageSearch";
import MessageList from "./MessageList";

function MessageBox({users, currentUser, onSendMessage, onDeleteMessage, onEditMessage}) {
  const [search, setSearch] = useState("")
  const [currentUserSentMessages, setCurrentUserSentMessages] = useState(currentUser.sent_messages.map((mes)=>mes))
  const [currentUserReceivedMessages, setCurrentUserReceivedMessages] = useState(currentUser.received_messages.map((mes)=>mes))
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortType, setSortType] = useState("name");

/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory()

  // This is what implements Tailwind... so DON'T delete it. 
  useEffect(() => {
    initTE({ Datepicker, Input, Select, Ripple });
  }, []); 

  // Kept having to fetch, so figured I'd just write it once, and call it when I need it.
  function fetchMessages(){
    fetch(`api/users/${currentUser.id}`)
        .then(response => response.json())
        .then(userData => {
        setCurrentUserReceivedMessages(userData.received_messages);
        setCurrentUserSentMessages(userData.sent_messages)
        })
        .catch(error => {
        console.error(error);
    });
}

// This is to fetch the messages from the db every 5 seconds.
useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentUser) {
        fetchMessages()
        console.log('stuff')
      }
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [currentUser]);

// And now we will handle the sent message, and put it into state... 
// This is for outgoing messages to render... It gets closer each time. 
function handleSendMessage(newMessage) {
    fetchMessages()
    onSendMessage(newMessage)
}

// This is for Edited outgoing messages to render... It gets closer each time. 
function handleEditMessage(editedMessage) {
    fetchMessages()
    onEditMessage(editedMessage)
}

  function sortUsers(usersToSort) {
    return usersToSort.sort((a, b) => {
      switch (sortType) {
        case "name":
          return a.username.localeCompare(b.username);
        case "id":
          return a.id - b.id;
        case "recent":
          return (
            new Date(b.messages[0]?.created_at || 0) -
            new Date(a.messages[0]?.created_at || 0)
          );
        default:
          return 0;
      }
    });
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
  
  const usersWithMessageHistory = sortUsers(filteredUsers.map((user) => {
    const userMessages = filteredMessages.filter(message => message.sender_user_id === user.id || message.receiver_user_id === user.id);
    return { ...user, messages: userMessages };
  }));
  
  const selectedUserMessages = selectedUser ? 
    selectedUser.messages.filter(message => message.message_text.toLowerCase().includes(search.toLowerCase()))
  : [];
  
  return (
    <main>
      {selectedUser ? 
        <div>
          <button onClick={() => setSelectedUser(null)}>Back</button>
          <MessageSearch search={search} onSearchChange={setSearch} />
          <MessageList user={selectedUser} messages={selectedUserMessages} currentUser={currentUser} onSendMessage={handleSendMessage} onDeleteMessage={onDeleteMessage} onEditMessage={handleEditMessage} />
        </div> 
      : 
        <div>
          <div className="flex justify-center">
            <div className="relative mb-3 w-3/4" >
              <select data-te-select-init value={sortType} onChange={(e) => setSortType(e.target.value)} className="sorting-dropdown appearance-none border border-gray-400 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500">
                <option value="name">Name</option>
                <option value="id">ID</option>
                <option value="recent">Recent Message</option>
              </select>
              <label data-te-select-label-ref className="text-purple-400">Sort By</label>
            </div>
          </div>
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
        </div>
      }
    </main>
  );
}

export default MessageBox;