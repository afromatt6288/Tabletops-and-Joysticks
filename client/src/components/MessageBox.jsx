import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageSearch from "./MessageSearch";
import MessageList from "./MessageList";
// import MessageNew from "./MessageNew";

function MessageBox({users, currentUser, onSendMessage, onDeleteMessage, onEditMessage, currentUserSentMessages, onCurrentUserSentMessages, currentUserReceivedMessages, onCurrentUserReceivedMessages}) {
  const [search, setSearch] = useState("")
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
  
  function handleEditMessage(editedMessage) {
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
          <MessageList user={selectedUser} messages={selectedUserMessages} currentUser={currentUser} onSendMessage={onSendMessage} onDeleteMessage={onDeleteMessage} onEditMessage={handleEditMessage} />
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

// import React, { useState, useEffect } from "react";
// import { useParams, useHistory, Link } from "react-router-dom";
// import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
// import MessageSearch from "./MessageSearch";
// import MessageList from "./MessageList";
// import MessageNew from "./MessageNew";

// function MessageBox({users, currentUser, onSendMessage, onDeleteMessage, onEditMessage, currentUserSentMessages, onCurrentUserSentMessages, currentUserReceivedMessages, onCurrentUserReceivedMessages}) {
//   const [search, setSearch] = useState("")
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [sortType, setSortType] = useState("name");

// /////////////////////
// // Setup Functions //
// /////////////////////

//   const history = useHistory()

//   // This is what implements Tailwind... so DON'T delete it. 
//   useEffect(() => {
//     initTE({ Datepicker, Input, Select, Ripple });
//   }, []); 
  
//   function handleEditMessage(editedMessage) {
//     onEditMessage(editedMessage)
//   }

  // function sortUsers(usersToSort) {
  //   return usersToSort.sort((a, b) => {
  //     switch (sortType) {
  //       case "name":
  //         return a.username.localeCompare(b.username);
  //       case "id":
  //         return a.id - b.id;
  //       case "recent":
  //         return (
  //           new Date(b.messages[0]?.created_at || 0) -
  //           new Date(a.messages[0]?.created_at || 0)
  //         );
  //       default:
  //         return 0;
  //     }
  //   });
  // }

//   const filteredMessages = currentUserSentMessages.concat(currentUserReceivedMessages)
//   .filter(message => message.message_text.toLowerCase().includes(search.toLowerCase()))
//   .map(message => ({
//     id: message.id,
//     message_text: message.message_text,
//     sender_user_id: message.sender_user_id,
//     receiver_user_id: message.receiver_user_id,
//     created_at: message.created_at
//   }));

//   const userIds = new Set(filteredMessages.flatMap(message => [message.sender_user_id, message.receiver_user_id]));
//   const filteredUsers = users.filter(user => userIds.has(user.id) && user.id !== currentUser.id);
  
//   const usersWithMessageHistory = sortUsers(filteredUsers.map((user) => {
//     const userMessages = filteredMessages.filter(message => message.sender_user_id === user.id || message.receiver_user_id === user.id);
//     return { ...user, messages: userMessages };
//   }));
  
//   const selectedUserMessages = selectedUser ? 
//     selectedUser.messages.filter(message => message.message_text.toLowerCase().includes(search.toLowerCase()))
//   : [];
  
//   return (
//     <main>
//       {selectedUser ? 
//         <div>
//           <button onClick={() => setSelectedUser(null)}>Back</button>
//           <MessageSearch search={search} onSearchChange={setSearch} />
//           <MessageList user={selectedUser} messages={selectedUserMessages} currentUser={currentUser} onDeleteMessage={onDeleteMessage} onEditMessage={handleEditMessage} />
//         </div> 
//       : 
//         <>
//           <MessageSearch search={search} onSearchChange={setSearch} />
          // <Select
          //   value={sortType}
          //   onChange={(e) => setSortType(e.target.value)}
          //   className="sorting-dropdown"
          // >
          //   <option value="name">Sort by Name</option>
          //   <option value="id">Sort by ID</option>
          //   <option value="recent">Sort by Recent Message</option>
          // </Select>
//           <ul>
//             {usersWithMessageHistory.map((user) => (
//               <li key={user.id}>
//                 <button onClick={() => setSelectedUser(user)}>
//                   {user.username}
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <MessageNew currentUser={currentUser} onSendMessage={onSendMessage} />
//         </>
//       }
//     </main>
//   );
// }

// export default MessageBox;