import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageBox from "./MessageBox"
import GameList from "./GameList"
import AddGameByNameId from "./AddGameByNameId"

function UserProfile({users, currentUser, messages, onUserDelete, onLogoutClick, onEditProfile, onSendMessage, onDeleteMessage, onEditMessage}) {
    const {id, username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = currentUser    
    const [edit, setEdit] = useState(false)
    const [newAvatar, setNewAvatar] = useState(`${avatar_url}`)
    const [newEmail, setNewEmail] = useState(`${email}`)
    const [newAddress, setNewAddress] = useState(`${address}`)
    const [newTravel, setNewTravel] = useState(`${travel_distance}`)
    const [currentUserGames, setCurrentUserGames] = useState(currentUser.inventories.map((inv)=>inv.game))
    const [currentUserSentMessages, setCurrentUserSentMessages] = useState(currentUser.sent_messages.map((mes)=>mes))
    const [currentUserReceivedMessages, setCurrentUserReceivedMessages] = useState(currentUser.received_messages.map((mes)=>mes))
    
/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    console.log(currentUserSentMessages)
    console.log(currentUserReceivedMessages)

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    function handleAddGameToProfile(inv){
        const updatedGames = [... currentUserGames, inv.game]
        setCurrentUserGames(updatedGames);
    }
    
    function handleEditProfile(e) {
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
                    })
                }
            })
    }

    function handleUserDelete() {
        fetch(`api/users/${id}`, {
          method: "DELETE"
        })        
        onUserDelete(id)
        onLogoutClick()
        history.push(`/users`)
    } 
    
    function handleLogoutClick() {
        onLogoutClick()
    }

    return (
        <div>
            <label>Edit Account: </label>
            <button onClick={() => setEdit(!edit)}>✏️</button>
                <span role="img" aria-label="edit">
                     {edit ? <button type="submit" onClick={handleEditProfile}> | Submit Changes</button> : null}
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
            <h3>Peer Rating: {stars} Stars | Status: {is_active ? "Online" : "Offline"}</h3>
            {edit ? 
                <label>
                    Travel Distance: <input type="number" onChange={e => setNewTravel(e.target.value)} value={newTravel}/>Miles ✏️</label>
            : <label>Travel Distance: {travel_distance} Miles</label>}
            {/* <Link to={`/swaps`}>Swap History</Link> */}
            <form>
                {edit ? 
                    <label> Email: <input type="text" onChange={e => setNewEmail(e.target.value)} value={newEmail}/>✏️</label>
                :   <label> Email: {email} </label>}
                {edit ? 
                    <label> | Address: <input type="text" onChange={e => setNewAddress(e.target.value)} value={newAddress}/>✏️</label>
                :   <label> | Address: {address} </label>}
            </form>
            <button onClick={handleLogoutClick}><label>LOGOUT </label></button>
            {edit ? <label> | Delete Account 👉 <button type="submit" onClick={handleUserDelete}>🗑 </button></label> : null}
            <br/>
            <label>YOUR MESSAGES:</label>
            <MessageBox users={users} currentUser={currentUser} currentUserSentMessages={currentUserSentMessages} onCurrentUserSentMessages={setCurrentUserSentMessages} currentUserReceivedMessages={currentUserReceivedMessages} onCurrentUserReceivedMessages={setCurrentUserReceivedMessages} onSendMessage={onSendMessage} onDeleteMessage={onDeleteMessage} onEditMessage={onEditMessage}/>
            <br/>
            <label>YOUR GAMES:<span>{edit ? <AddGameByNameId currentUser={currentUser} onAddGameToProfile={handleAddGameToProfile}/> : null}</span></label>
            <GameList currentUser={currentUser} games={currentUserGames} edit={edit} onCurrentUserGames={setCurrentUserGames}/>
        </div>
    )
}
export default UserProfile