import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link, Route, Switch } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageBox from "./MessageBox"
import GameList from "./GameList"
import AddGameByNameId from "./AddGameByNameId"

function UserProfile({users, currentUser, messages, theme, onUserDelete, onLogoutClick, onEditProfile, onSendMessage, onDeleteMessage, onEditMessage}) {
    const {id, username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = currentUser    
    const [edit, setEdit] = useState(false)
    const [newAvatar, setNewAvatar] = useState(`${avatar_url}`)
    const [newEmail, setNewEmail] = useState(`${email}`)
    const [newAddress, setNewAddress] = useState(`${address}`)
    const [newTravel, setNewTravel] = useState(`${travel_distance}`)
    const [currentUserGames, setCurrentUserGames] = useState(currentUser.inventories.map((inv)=>inv.game))
    const [newTheme, setNewTheme] = useState("")
    
/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    const themeList = [ "default-blue/black", "purple", "orange", "yellow", "blue", "green", "multi",]

    function handleAddGameToProfile(inv){
        const updatedGames = [... currentUserGames, inv.game]
        setCurrentUserGames(updatedGames);
    }
    
    function handleEditProfile(e) {
        e.preventDefault()
        history.push(`/`)
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
        <div className="text-[var(--color-theme-text)!important] border-[var(--color-theme-border)!important] hover:text-[var(--color-theme-hover-text)!important] hover:border-[var(--color-theme-hover-border)!important] w-screen">
            <div className="flex justify-center items-center">
                <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-70 shadow-lg dark:bg-neutral-800 w-[540px] h-[300px]">
                    <header className="mt-2 flex justify-center">
                        <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]'}`}
                            >Edit Account: 
                        </label>
                        <button className="mx-4" onClick={() => setEdit(!edit)}> ✏️</button>
                        {edit ? (
                            <span role="img" aria-label="edit" className="flex items-center">
                                <select value={newTheme} onChange={(e) => setNewTheme(e.target.value)} data-te-select-init
                                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]'} w-24 mr-1`} 
                                >
                                    {themeList.map((newTheme) => <option key={newTheme} value={newTheme} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]'}`}
                                        >{newTheme}
                                    </option>)}
                                </select>
                                <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]'} mr-1 w-24 `}
                                    >Theme: 
                                </label>
                                <button type="submit" onClick={handleEditProfile} className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`} >
                                    <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] font-extrabold'}`}
                                        >Submit Changes
                                    </span>
                                </button>
                            </span>
                            )
                        : null}
                    </header>
                    <header className="flex justify-center">
                        <div className="flex">
                            <div className="mr-8">
                                <img src={avatar_url} alt={`${username} Avatar`} className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] h-40 w-40 object-cover border-2 rounded-full`}/>
                                {edit? 
                                    <span className="flex">
                                        <div className="relative mb-3" data-te-input-wrapper-init>
                                            <input type="url" value={newAvatar} onChange={e => setNewAvatar(e.target.value)}
                                                className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}/>
                                            <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] '} pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                                                >Avatar URL
                                            </label>
                                        </div> ✏️
                                    </span> 
                                : null} 
                            </div>
                            <div className="flex-grow">
                                <div className=" mb-2">
                                    <div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex mt-4`}>
                                            {username} | #{id} {is_admin ? " | Moderator" : null }
                                        </div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                                            <h3>Peer Rating: {stars} Stars </h3>
                                        </div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                                            <h3>Status: {is_active ? "Online" : "Offline"}</h3>
                                        </div>
                                        {edit? 
                                            <div className="flex">
                                                <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } mr-2`}
                                                    >Travel Distance:
                                                </label>
                                                <div className="relative mb-3" data-te-input-wrapper-init>
                                                    <input type="number" onChange={e => setNewTravel(e.target.value)} value={newTravel}
                                                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } peer block min-h-[auto] w-24 rounded border-0 bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                    />
                                                </div>
                                                <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}
                                                    >Miles 
                                                </span>
                                                <span>✏️</span>
                                            </div>
                                        :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                                                <h3>Travel Distance: {travel_distance} Miles</h3>
                                            </div>
                                        }
                                        {edit? 
                                            <div className="flex">
                                                <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } mr-2`}
                                                    >Email: 
                                                </label>
                                                <div className="relative mb-3" data-te-input-wrapper-init>
                                                    <input type="email" onChange={e => setNewEmail(e.target.value)} value={newEmail}
                                                        className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                    />
                                                </div>
                                                <span> ✏️</span>
                                            </div>
                                        :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                                                <h3> Email: {email} </h3>
                                            </div>
                                        }
                                        {edit? 
                                            <div className="flex">
                                                <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } mr-2`}
                                                    >Address: 
                                                </label>
                                                <div className="relative mb-3" data-te-input-wrapper-init>
                                                    <input type="address" onChange={e => setNewAddress(e.target.value)} value={newAddress}
                                                        className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                    />
                                                </div>
                                                <span> ✏️</span>
                                            </div>
                                        :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                                                <h3> Address: {address} </h3>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>           
                    <button onClick={handleLogoutClick} className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`} >
                        <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] font-extrabold'}`}
                            >LOGOUT 
                        </span>
                    </button>
                    {edit ? 
                        <button onClick={handleUserDelete} className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`}> 
                            <span className="text-white"> 🗑 </span> 
                            <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] font-extrabold'}`}
                                >Delete Account
                            </span> 
                            <span className="text-white"> 🗑 </span> 
                        </button>
                    : null}
                </div>  
            </div>
            <div className="flex my-4 justify-between min-w-screen ">
                <div className="flex flex-col w-2/3 ml-7 h-[calc(100vh-450px)] md:h-[calc(100vh-475px)] lg:h-[calc(100vh-500px)] xl:h-[calc(100vh-525px)] 2xl:h-[calc(100vh-550px)] ">
                    <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] ' } mb-2 font-extrabold border-b-4`}
                        >YOUR GAMES:
                    </label>
                    <span>
                        {edit ? 
                            <AddGameByNameId currentUser={currentUser} onAddGameToProfile={handleAddGameToProfile} theme={theme}/> 
                        : null}
                    </span> 
                    <div className="overflow-y-auto">                    
                        <GameList theme={theme} currentUser={currentUser} games={currentUserGames} edit={edit} onCurrentUserGames={setCurrentUserGames}/>
                    </div> 
                </div>
                <div className="flex flex-col w-1/3 h-[calc(100vh-450px)] md:h-[calc(100vh-475px)] lg:h-[calc(100vh-500px)] xl:h-[calc(100vh-525px)] 2xl:h-[calc(100vh-550px)]">
                    <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' } mb-2 font-extrabold border-b-4`}
                        >YOUR MESSAGES:
                    </label>
                    <div className="overflow-y-auto">
                        <MessageBox theme={theme} users={users} currentUser={currentUser} onSendMessage={onSendMessage} onDeleteMessage={onDeleteMessage} onEditMessage={onEditMessage}/>
                    </div>
                </div>
                {/* <Link to={`/swaps`}>Swap History</Link> */}
            </div>
        </div>
    )
}
export default UserProfile