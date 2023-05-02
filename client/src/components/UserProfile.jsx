import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import AddGameById from "./AddGameById"

function UserProfile({currentUser, setCurrentUser,  onUserDelete, onLogoutClick, onEditProfile, onRemoveGameFromProfile}) {
    const {id, username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = currentUser    
    const [edit, setEdit] = useState(false)
    const [newAvatar, setNewAvatar] = useState(`${avatar_url}`)
    const [newEmail, setNewEmail] = useState(`${email}`)
    const [newAddress, setNewAddress] = useState(`${address}`)
    const [newTravel, setNewTravel] = useState(`${travel_distance}`)
    const [currentUserGames, setCurrentUserGames] = useState(currentUser.inventories.map((inv)=>inv.game))
    
    const history = useHistory()

    function handleAddGameToProfile(inv){
        const updatedGames = [... currentUserGames, inv.game]
        // onEditProfile(currentUser)  
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
                })}
        })
    }

    function handleRemoveGameFromProfile(){
        const invToDelete = currentUser.inventories.find(inventory => inventory.game_id === id)
        fetch(`api/inventories/${parseInt(invToDelete.id)}`, {
            method: "DELETE"
          })
        //   onEditProfile(currentUser)        
        //   onRemoveGameFromProfile(id)
          history.push(`/`)
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
                    <label>Email: <input type="text" onChange={e => setNewEmail(e.target.value)} value={newEmail}/>✏️</label>
                :   <label> Email: {email} </label>}
                {edit ? 
                    <label>Address: <input type="text" onChange={e => setNewAddress(e.target.value)} value={newAddress}/>✏️</label>
                :   <label> Address: {address} </label>}
            </form>
            <button onClick={handleLogoutClick}><label>LOGOUT </label></button>
            {edit ? <label> | Delete Account 👉 <button type="submit" onClick={handleUserDelete}>🗑 </button></label> : null}
            <br/>
            <label>YOUR GAMES:<span>{edit ? <AddGameById currentUser={currentUser} onAddGameToProfile={handleAddGameToProfile}/> : null}</span></label>
                <div>
                    <Card.Group className="cards" itemsPerRow={2}>
                        {currentUserGames.map((game) => (
                            <div key={game.id}>
                                <h4>{game.title} | #{game.id}</h4>
                                <Link to={`/games/${game.id}`}>
                                    <img className="img-thumb" src={game.image} alt={game.title} />
                                </Link>
                                <h4>{game.type}</h4>
                                <button onClick={handleRemoveGameFromProfile}>X</button>
                            </div>
                        ))}
                    </Card.Group>  
                </div>
        </div>
    )
}
export default UserProfile