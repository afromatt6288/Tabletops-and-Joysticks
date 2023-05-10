import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function EditMessage({ id, message_text, onEditMessage, theme }) {
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
    fetch(`api/messages/${id}`, {
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
            console.log(message)
            onEditMessage(message)
              history.push(`/users/${id}`)
              history.push(`/`)
        })}
      })
  }         

  return (
    <form className="mt-2" onSubmit={handleEditMessage}>
      <div className="relative mb-3" data-te-input-wrapper-init>
        <textarea rows="4" value={messageText} onChange={e => setMessageText(e.target.value)}
          className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
        />
        <label
          className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
          >messageText
        </label>
      </div>
      <button type="submit" className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`} >
        <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] font-extrabold'}`}
          >Save
        </span>
      </button>
    </form>
  );
}

export default EditMessage;