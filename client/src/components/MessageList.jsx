import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import Message from "./Message";
import MessageNew from "./MessageNew";

function MessageList({ users, user, messages, currentUser, onSendMessage, onDeleteMessage, onEditMessage, theme }) {
  
/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory()

  // This is what implements Tailwind... so DON'T delete it. 
  useEffect(() => {
    initTE({ Datepicker, Input, Select, Ripple });
  }, []);

  messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' } list`}>
      <ul>{messages.map(message => (
            <Message theme={theme} key={message.id} message={message} user={user} currentUser={currentUser} onDeleteMessage={onDeleteMessage} onEditMessage={onEditMessage} />
      ))}
      </ul>
      <MessageNew theme={theme} user={user} currentUser={currentUser} onSendMessage={onSendMessage} />
    </div>
  );
}

export default MessageList;