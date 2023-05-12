import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link, Route, Switch } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import MessageBox from "./MessageBox"
import GameList from "./GameList"
import AddGameByNameId from "./AddGameByNameId"

function UserProfile({users, currentUser, setCurrentUser, messages, theme, onUserDelete, onLogoutClick, onEditProfile, onSendMessage, onDeleteMessage, onEditMessage}) {
    const {id, username, email, address, city, state, country, zipcode, avatar_url, stars, travel_distance, is_active, is_admin} = currentUser    
    const [edit, setEdit] = useState(false)
    const [newAvatar, setNewAvatar] = useState(`${avatar_url}`)
    const [newEmail, setNewEmail] = useState(`${email}`)
    const [newAddress, setNewAddress] = useState(`${address}`)
    const [newCity, setNewCity] = useState(`${city}`)
    const [newState, setNewState] = useState(`${state}`)
    const [newCountry, setNewCountry] = useState(`${country}`)
    const [newZipcode, setNewZipcode] = useState(`${zipcode}`)
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

    const themeList = ["red", "orange", "yellow", "green", "blue", "purple", "multi"]

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
        <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] border-[var(--color-theme-border)!important]  hover:border-[var(--color-theme-hover-border)!important] w-screen">
            <div className="flex justify-center items-center">
                <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-70 shadow-lg dark:bg-neutral-800 w-[540px] h-[300px]">
                    <header className="mt-2 flex justify-center">
                        <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '}`}
                            >Edit Account: 
                        </label>
                        <button className="mx-4" onClick={() => setEdit(!edit)}> ✏️</button>
                        {edit ? (
                            <span role="img" aria-label="edit" className="flex items-center">
                                <select value={theme} onChange={(e) => setNewTheme(e.target.value)} data-te-select-init
                                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} w-24 mr-1`} 
                                >
                                    {themeList.map((newTheme) => <option key={newTheme} value={newTheme} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]'}`}
                                        >{newTheme}
                                    </option>)}
                                </select>
                                <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} mr-1 w-24 `}
                                    >Theme: 
                                </label>
                                <button type="submit" onClick={handleEditProfile} className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`} >
                                    <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-gradient-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  font-extrabold'}`}
                                        >Submit Changes
                                    </span>
                                </button>
                            </span>
                            )
                        : null}
                    </header>
                    <header className="flex justify-center">
                        <div className="flex">
                            <div className="flex flex-col">
                                <div className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] h-40 w-40 object-cover border-2 rounded-full mr-8 overflow-hidden `}>
                                    <img src={avatar_url} alt={`${username} Avatar`} className="object-contain h-full w-full" />
                                </div>    
                                {edit? 
                                    <span className="flex mt-2">
                                        <div className="relative mb-3" data-te-input-wrapper-init>
                                            <input type="url" value={newAvatar} onChange={e => setNewAvatar(e.target.value)}
                                                className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}/>
                                            <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                                                >Avatar URL
                                            </label>
                                        </div> ✏️
                                    </span> 
                                : null} 
                            </div>
                            <div className="flex-grow">
                                <div className=" mb-2">
                                    <div>
                                        {edit? 
                                            null 
                                        :
                                            <div>
                                                <div className="flex">
                                                    <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mt-4 mr-2 `}>
                                                        <h3>{username}</h3>
                                                    </div>
                                                    <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } border-[var(--color-theme-border)!important] border-l-2 mt-4 mr-2`}>
                                                        <h3 className="ml-2">ID# {id}</h3>
                                                    </div>
                                                    {is_admin ?
                                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } border-[var(--color-theme-border)!important] border-l-2 mt-4`}>
                                                            <h3 className="ml-2">Moderator</h3>
                                                        </div>
                                                    : null }
                                                </div>
                                                <div className="flex">
                                                    <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2 `}>
                                                        <h3>Peer Rating: {stars} Stars </h3>
                                                    </div>
                                                    <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } border-[var(--color-theme-border)!important] border-l-2 flex`}>
                                                        <h3 className="ml-2">Status: {is_active ? "Online" : "Offline"}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {edit? 
                                            <div className="flex">
                                                <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}
                                                    >Email: 
                                                </label>
                                                <div className="relative mb-3" data-te-input-wrapper-init>
                                                    <input type="email" onChange={e => setNewEmail(e.target.value)} value={newEmail}
                                                        className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                    />
                                                </div>
                                                <span> ✏️</span>
                                            </div>
                                        :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex`}>
                                                <h3> Email: {email} </h3>
                                            </div>
                                        }
                                        {edit? 
                                            <div className="flex">
                                                <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}
                                                    >Address: 
                                                </label>
                                                <div className="relative mb-3" data-te-input-wrapper-init>
                                                    <input type="address" onChange={e => setNewAddress(e.target.value)} value={newAddress}
                                                        className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                    />
                                                </div>
                                                <span> ✏️</span>
                                            </div>
                                        :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex`}>
                                                <h3> Address: {address} </h3>
                                            </div>
                                        }
                                        <div className="flex">
                                            {edit? 
                                                <div className="flex">
                                                    <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}
                                                        >City: 
                                                    </label>
                                                    <div className="relative mb-3" data-te-input-wrapper-init>
                                                        <input type="city" onChange={e => setNewCity(e.target.value)} value={newCity}
                                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                        />
                                                    </div>
                                                    <span> ✏️</span>
                                                </div>
                                            :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}>
                                                    <h3> City: {city} </h3>
                                                </div>
                                            }
                                            {edit? 
                                                <div className="flex ">
                                                    <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}
                                                        >State: 
                                                    </label>
                                                    <div className="relative mb-3" data-te-input-wrapper-init>
                                                        <input type="state" onChange={e => setNewState(e.target.value)} value={newState}
                                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                        />
                                                    </div>
                                                    <span> ✏️</span>
                                                </div>
                                            :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } border-[var(--color-theme-border)!important] border-l-2`}>
                                                    <h3 className="ml-2"> State: {state} </h3>
                                                </div>
                                            }
                                        </div>
                                        <div className="flex">
                                            {edit? 
                                                <div className="flex">
                                                    <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}
                                                        >Country: 
                                                    </label>
                                                    <div className="relative mb-3" data-te-input-wrapper-init>
                                                        <input type="country" onChange={e => setNewCountry(e.target.value)} value={newCountry}
                                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                        />
                                                    </div>
                                                    <span> ✏️</span>
                                                </div>
                                            :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}>
                                                    <h3> Country: {country} </h3>
                                                </div>
                                            }
                                            {edit? 
                                                <div className="flex ">
                                                    <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}
                                                        >Zipcode: 
                                                    </label>
                                                    <div className="relative mb-3" data-te-input-wrapper-init>
                                                        <input type="zipcode" onChange={e => setNewZipcode(e.target.value)} value={newZipcode}
                                                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                        />
                                                    </div>
                                                    <span> ✏️</span>
                                                </div>
                                            :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } border-[var(--color-theme-border)!important] border-l-2`}>
                                                    <h3 className="ml-2"> Zipcode: {zipcode} </h3>
                                                </div>
                                            }
                                        </div>
                                        {edit? 
                                            <div className="flex">
                                                <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mr-2`}
                                                    >Travel Distance:
                                                </label>
                                                <div className="relative mb-3" data-te-input-wrapper-init>
                                                    <input type="number" onChange={e => setNewTravel(e.target.value)} value={newTravel}
                                                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } peer block min-h-[auto] w-24 rounded border-0 bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                    />
                                                </div>
                                                <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' }`}
                                                    >Miles 
                                                </span>
                                                <span>✏️</span>
                                            </div>
                                        :   <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex`}>
                                                <h3>Travel Distance: {travel_distance} Miles</h3>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>           
                    <button onClick={handleLogoutClick} className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`} >
                        <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-gradient-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  font-extrabold'}`}
                            >LOGOUT 
                        </span>
                    </button>
                    {edit ? 
                        <button onClick={handleUserDelete} className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`}> 
                            <span className="text-white"> 🗑 </span> 
                            <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-gradient-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  font-extrabold'}`}
                                >Delete Account
                            </span> 
                            <span className="text-white"> 🗑 </span> 
                        </button>
                    : null}
                </div>  
            </div>
            <div className="flex my-4 justify-between min-w-screen ">
                <div className="flex flex-col w-2/3 ml-7 h-[calc(100vh-335px)] ">
                    <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] ' } mb-2 font-extrabold border-b-4`}
                        >YOUR GAMES:
                    </label>
                    <div>
                        <span>
                            {edit ? 
                                <AddGameByNameId currentUser={currentUser} onAddGameToProfile={handleAddGameToProfile} theme={theme}/> 
                            : null}
                        </span> 
                        <div className={`${edit? 'h-[calc(100vh-452px)]' : 'h-[calc(100vh-370px)]' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-xl overflow-hidden overflow-y-auto h-[calc(100vh-370px)] `} >                    
                            <GameList theme={theme} currentUser={currentUser} games={currentUserGames} edit={edit} onCurrentUserGames={setCurrentUserGames}/>
                        </div> 
                    </div>
                </div>
                <div className="flex flex-col w-1/3 h-[calc(100vh-335px)] ">
                    <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' } mb-2 font-extrabold border-b-4`}
                        >YOUR MESSAGES:
                    </label>
                    <div className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-xl bg-gray-600 bg-opacity-60 overflow-y-auto h-[calc(100vh-350px)]`}>
                        <MessageBox theme={theme} users={users} currentUser={currentUser} messages={messages} onSendMessage={onSendMessage} onDeleteMessage={onDeleteMessage} onEditMessage={onEditMessage}/>
                    </div>
                </div>
                {/* <Link to={`/swaps`}>Swap History</Link> */}
            </div>
        </div>
    )
}
export default UserProfile