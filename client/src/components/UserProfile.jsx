import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserProfile({user, onUserDelete, forceLogOut}) {
    const {id, username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = user    
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
        forceLogOut()
    }    

    return (
        <div>
            <header>
                <div>
                    <span>{username} | #{id}
                    <img src={avatar_url} alt={`${username} Avatar`} />
                    </span>
                </div>
            </header>
            <h3>{stars}</h3>
            <h3>{travel_distance}</h3>
            <h3>{is_active}</h3>
            <h3>{is_admin}</h3>
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
export default UserProfile