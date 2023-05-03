import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageSearch from "./MessageSearch";
import MessageList from "./MessageList";
import MessageNew from "./MessageNew";

function MessageBox(currentUser, messages, onSendMessage, onDeleteMessage, onEditMessage) {
  const [search, setSearch] = useState("")

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
  
  console.log(messages)
  
  const displayedMessages = messages.filter(message => message.body.toLowerCase().includes(search.toLowerCase()))
  
  return (
    <main>
      <MessageSearch search={search} onSearchChange={setSearch} />
      <MessageList messages={displayedMessages} currentUser={currentUser} onDeleteMessage={onDeleteMessage} onEditMessage={handleEditMessage} />
      <MessageNew currentUser={currentUser} onSendMessage={onSendMessage} />
    </main>
  );
}

export default MessageBox;