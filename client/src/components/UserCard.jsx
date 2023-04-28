import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserCard({user, onUserDelete}) {
    const {id, username, email, address} = user   
    const [newEmail, setNewEmail] = useState(`${email}`)
    const [newAddress, setNewAddress] = useState(`${address}`)

    function handleUpdate(e) {
        e.preventDefault()
        const formData = {
            email: newEmail,
            address: newAddress        }
            fetch(`api/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(r => r.json())
            .then(user => {
                setNewEmail(user.email)
                setNewAddress(user.address)
            })
        }

    function handleUserDelete() {
        fetch(`api/users/${id}`, {
          method: "DELETE"
        })        
        onUserDelete(id)
    }    

    return (
        <div>
            <h3>{username}</h3>
            {/* <Link to={`/swaps`}>Swap History</Link> */}
            <form>
                <label> Update Email</label>
                <input type="text" onChange={e => setNewEmail(e.target.value)} value={newEmail}/>
                <label> Update Address </label>
                <input type="text" onChange={e => setNewAddress(e.target.value)} value={newAddress}/>
                <button type="submit" onClick={handleUpdate}>Submit Changes</button>   
            </form>
            <button onClick={handleUserDelete}>Delete Account</button>
        </div>
    )
}
export default UserCard