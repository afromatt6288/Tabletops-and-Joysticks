import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function EditMessage({ id, message_text, onEditedMessage }) {
  const [messageText, setMessageText] = useState(message_text);

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

  function handleEditMessage(e) {
    e.preventDefault();    
    const formData = {
        message_text: messageText
    }
    fetch(`/messages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r  => {
        if (r.ok) {
            r.json()
            .then(message => {
              onEditedMessage(message)
                history.push(`/users/${id}`)
                history.push(`/`)
        })}
      })
  }         

  return (
    <form className="edit-message" onSubmit={handleEditMessage}>
      <input type="text" name="message_text" autoComplete="off" value={messageText} onChange={(e) => setMessageText(e.target.value)}/>
      <button type="submit" value="Save" />
    </form>
  );
}

export default EditMessage;