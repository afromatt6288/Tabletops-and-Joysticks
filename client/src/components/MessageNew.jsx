import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function MessageNew({ user, currentUser, onSendMessage }) {
  const [messageText, setMessageText] = useState("")

/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory()

  // This is what implements Tailwind... so DON'T delete it. 
  useEffect(() => {
    initTE({ Datepicker, Input, Select, Ripple });
  }, []);
  
  function handleSendMessage(e) {
    e.preventDefault()
    history.push(`/`)
    const formData = {
      sender_user_id: currentUser.id,
      receiver_user_id: user.id,
      message_text: messageText
    }
    fetch("api/messages", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => {
          if (r.ok) {
            r.json()
            .then(data => {
              onSendMessage(data)
              setMessageText("")
              history.push(`/users/${id}`)
          })
          }
      })
  }
  
  return (
    <form className="new-message" onSubmit={handleSendMessage}>
      <input type="text" name="messageText" autoComplete="off" value={messageText} onChange={e => setMessageText(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageNew;
