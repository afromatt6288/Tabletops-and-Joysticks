
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, initTE } from "tw-elements";


function UserDetail({admin, currentUser, onSendMessage}) {
    const [message_text, setMessage_text] = useState("")
    const [user, setUser] = useState(null);
    const { id } = useParams()
    const history = useHistory()
    
    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
      initTE({ Datepicker, Input });
    }, []);

    console.log(message_text)
    
    useEffect(() => {
        fetch(`/api/users/${id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setUser(data)});
        }, [])
        
        if (!user) return <h2>Loading...</h2>
        
    const {username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = user   
    
    function handleSendMessage(e) {
        e.preventDefault()
        // history.push(`/`)
        const formData = {
            sender_user_id: currentUser.id,
            receiver_user_id: user.id,
            message_text: message_text
        }
        fetch("api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                onSendMessage(data)
                // history.push(`/users/${id}`)
            })
    }
    return (
        <div>
            <header>
                <img src={avatar_url} alt={`${username} Avatar`} />
                <span> Username: {username} | ID: #{id}</span>
            </header>
            <h3>Peer Rating: {stars} Stars</h3>
            <h3>Travel Distance: {travel_distance} Miles</h3>
            <h3>Active{is_active}</h3>
            <h3>{is_admin}</h3>
            <h3>{email}</h3>
            <h3>{address}</h3>
            <form>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <textarea type="text" id="send_messageFormControlInput1" value={message_text} onChange={e => setMessage_text(e.target.value)}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
                    <label
                    htmlFor="send_messageFormControlInput1"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Send a Message</label>
                </div><button type="submit" onClick={handleSendMessage}>Send</button>   
            </form>
        </div>
    )
}
export default UserDetail