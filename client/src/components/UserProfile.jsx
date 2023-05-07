import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link, Route, Switch } from "react-router-dom";
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
    const [newTheme, setNewTheme] = useState("purple")
    
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

    const themeList = ["purple", "orange", "blue", "green", "multi"]

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
            theme: newTheme
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

    function handleThemeChange(newTheme){
        setNewTheme(newTheme)
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
        <div className="text-white">
            <header className="text-white flex justify-center">
                <label>Edit Account: </label>
                <button className="mx-4" onClick={() => setEdit(!edit)}> ✏️</button>
                {edit ? (
                    <span role="img" aria-label="edit" className="flex items-center">
                        <select className="w-24 mr-1" value={newTheme} onChange={(e) => setNewTheme(e.target.value)}
                        data-te-select-init
                        >
                            {themeList.map((newTheme) => <option value={newTheme}>{newTheme}</option>)}
                        </select>
                        <label data-te-select-label-ref className="mr-1 w-24 text-white">Theme: </label>
                        <button type="submit" className="mx-4 px-1 py-1 bg-purple-500 text-white rounded" onClick={handleEditProfile}>Submit Changes</button>
                    </span>
                    )
                : null}
            </header>
            <header className="flex justify-center">
                <div className="flex">
                    <div className="mr-8">
                        <img src={avatar_url} alt={`${username} Avatar`} className="h-40 w-40 object-cover rounded-full"/>
                        {edit? 
                            <span className="flex">
                                <div className="relative mb-3" data-te-input-wrapper-init>
                                    <input type="url" value={newAvatar} onChange={e => setNewAvatar(e.target.value)}
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
                                    <label className=" text-white pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                    >Avatar URL</label>
                                </div> ✏️
                            </span> 
                        : null} 
                    </div>
                    <div className="flex-grow">
                        <div className=" mb-2">
                            <div>
                                <div className="my-4"></div>
                                <div className="flex">
                                    {username} | #{id} {is_admin ? " | Moderator" : null }
                                </div>
                                <div className="flex">
                                <h3>Peer Rating: {stars} Stars </h3>
                                </div>
                                <div className="flex">
                                <h3>Status: {is_active ? "Online" : "Offline"}</h3>
                                </div>
                                {edit? 
                                    <div className="flex">
                                        <label className="mr-2">Travel Distance:</label>
                                        <div className="relative mb-3" data-te-input-wrapper-init>
                                            <input type="number" onChange={e => setNewTravel(e.target.value)} value={newTravel}
                                            className="peer block min-h-[auto] w-24 rounded border-0 bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            />
                                        </div>
                                        <span>Miles ✏️</span>
                                    </div>
                                :   <div className="flex"><h3>Travel Distance: {travel_distance} Miles</h3></div>}
                                {edit? 
                                    <div className="flex">
                                        <label className="mr-2">Email: </label>
                                        <div className="relative mb-3" data-te-input-wrapper-init>
                                            <input type="email" onChange={e => setNewEmail(e.target.value)} value={newEmail}
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            />
                                        </div>
                                        <span> ✏️</span>
                                    </div>
                                :   <div className="flex"><h3> Email: {email} </h3></div>}
                                {edit? 
                                    <div className="flex">
                                        <label className="mr-2">Address: </label>
                                        <div className="relative mb-3" data-te-input-wrapper-init>
                                            <input type="address" onChange={e => setNewAddress(e.target.value)} value={newAddress}
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            />
                                        </div>
                                        <span> ✏️</span>
                                    </div>
                                :   <div className="flex"><h3> Address: {address} </h3></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
           
            <button className="mx-4 px-4 py-1 bg-purple-500 text-white rounded" onClick={handleLogoutClick}>LOGOUT </button>
            {edit ? <label> | Delete Account 👉 <button type="submit" onClick={handleUserDelete}>🗑 </button></label> : null}
            <div className="my-4"></div>
            <div className="flex">
                <div className="flex flex-col overflow-y-auto w-2/3 h-[calc(100vh-440px)]">
                    <label>YOUR GAMES:<span>{edit ? <AddGameByNameId currentUser={currentUser} onAddGameToProfile={handleAddGameToProfile}/> : null}</span></label>
                    <GameList currentUser={currentUser} games={currentUserGames} edit={edit} onCurrentUserGames={setCurrentUserGames}/>
                </div>
                <div className="flex flex-col overflow-y-auto w-1/3 h-[calc(100vh-440px)]">
                    <label>YOUR MESSAGES:</label>
                    <MessageBox users={users} currentUser={currentUser} currentUserSentMessages={currentUserSentMessages} onCurrentUserSentMessages={setCurrentUserSentMessages} currentUserReceivedMessages={currentUserReceivedMessages} onCurrentUserReceivedMessages={setCurrentUserReceivedMessages} onSendMessage={onSendMessage} onDeleteMessage={onDeleteMessage} onEditMessage={onEditMessage}/>
                </div>
            </div>
            {/* <Link to={`/swaps`}>Swap History</Link> */}
        </div>
    )
}
export default UserProfile