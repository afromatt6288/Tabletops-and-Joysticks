import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function MessageNew({ user, currentUser, onSendMessage, theme }) {
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
          // history.push(`/users/${id}`)
        })
      }
    })
  }
  
  return (
    <form className="new-message mt-2" onSubmit={handleSendMessage}>
      <div className="relative mb-3" data-te-input-wrapper-init>
        <textarea rows="4" id="messageTextFormControlInput1" value={messageText} onChange={e => setMessageText(e.target.value)}
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
        <label htmlFor="messageTextFormControlInput1"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >messageText</label>
      </div>
      <div className="relative flex justify-center">
        <button type="submit" className="mx-4 px-1 py-1 bg-purple-500 text-white rounded">Send</button>            
      </div>
    </form>
  );
}

export default MessageNew;
