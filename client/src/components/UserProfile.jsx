import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function UserProfile({currentUser, onUserDelete, onLogoutClick, onEditProfile}) {
    const {id, username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = currentUser    
    const [edit, setEdit] = useState(false)
    const [newAvatar, setNewAvatar] = useState(`${avatar_url}`)
    const [newEmail, setNewEmail] = useState(`${email}`)
    const [newAddress, setNewAddress] = useState(`${address}`)
    const [newTravel, setNewTravel] = useState(`${travel_distance}`)
    
    const history = useHistory()

    function handleUpdate(e) {
        e.preventDefault()
        const formData = {
            avatar_url: newAvatar,
            email: newEmail,
            address: newAddress,
            travel_distance: parseInt(newTravel),
        }
            fetch(`api/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(r => {
                if (r.ok) {
                    r.json()
                    .then(currentUser => {
                        onEditProfile(currentUser)
                        setEdit(false)
                        setNewAvatar(newAvatar)
                        setNewEmail(newEmail)
                        setNewAddress(newAddress)
                        setNewTravel(parseInt(newTravel))
                        history.push(`/users/${id}`)
                        history.push(`/`)
                })}
        })
    }
    // .then(r => r.json())
    //         .then(currentUser => {
                // setEdit(false)
                // setNewAvatar(newAvatar)
                // setNewEmail(newEmail)
                // setNewAddress(newAddress)
                // setNewTravel(parseInt(newTravel))
                // history.push(`/`)
    //         })
    //     }

    function handleUserDelete() {
        fetch(`api/users/${id}`, {
          method: "DELETE"
        })        
        onUserDelete(id)
        onLogoutClick()
    } 
    
    function handleLogoutClick() {
        onLogoutClick()
    }

    return (
        <div>
            <label>Edit Account: </label>
            <button onClick={() => setEdit(!edit)}>✏️</button>
                <span role="img" aria-label="edit">
                     {edit ? <button type="submit" onClick={handleUpdate}> | Submit Changes</button> : null}
                </span>
                     
            <header>
                <div>
                    <span>
                        <img src={avatar_url} alt={`${username} Avatar`}/>
                        {username} | #{id} {is_admin ? " | Moderator" : null }
                        {edit? <label> | Avatar URL: <input type="url" onChange={e => setNewAvatar(e.target.value)} value={newAvatar}/>✏️</label> 
                         : null}
                    </span>
                </div>
            </header>
            <h3>Peer Rating: {stars} Stars | Active: {is_active ? "Online" : "Offline"}</h3>
            {edit ? 
                <label>
                    Travel Distance: <input type="number" onChange={e => setNewTravel(e.target.value)} value={newTravel}/>Miles ✏️</label>
            : <label>Travel Distance: {travel_distance} Miles</label>}
            {/* <Link to={`/swaps`}>Swap History</Link> */}
            <form>
                {edit ? 
                    <label> 
                        Email: <input type="text" onChange={e => setNewEmail(e.target.value)} value={newEmail}/>✏️</label>
                : <label> Email: {email} </label>}
                {edit ? 
                <label> 
                    Address: <input type="text" onChange={e => setNewAddress(e.target.value)} value={newAddress}/>✏️</label>
                : <label> Address: {address} </label>}
            </form>
            <button onClick={handleLogoutClick}><label>Log Out </label></button>
            {edit ? <button type="submit" onClick={handleUserDelete}> <label> | Delete Account 👉 🗑</label> </button> : null}
        </div>
    )
}
export default UserProfile