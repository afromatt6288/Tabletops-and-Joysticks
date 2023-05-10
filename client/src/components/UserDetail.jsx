import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import GameList from "./GameList"
import MessageNew from "./MessageNew";

function UserDetail({admin, currentUser, onSendMessage, onUserDelete, theme}) {
    // const [message_text, setMessage_text] = useState("")
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(false)
    
/////////////////////
// Setup Functions //
/////////////////////
    
    const history = useHistory()
    const { id } = useParams()

    console.log(user, currentUser)

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);
    
    useEffect(() => {
        fetch(`/api/users/${id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setUser(data)});
        }, [])
        
        if (!user) return <h2>Loading...</h2>
        
    const {username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = user
    
    // Add the users games to each user
    const allGames = user.inventories.map((inv)=>inv.game)

    function handleUserDelete() {
        history.push(`/`)
        fetch(`api/users/${id}`, {
          method: "DELETE"
        })        
        onUserDelete(id)
        history.push(`/`)
        history.push(`/users`)
    }    

    return (
        <div className="text-[var(--color-theme-text)!important] border-[var(--color-theme-border)!important] hover:text-[var(--color-theme-hover-text)!important] hover:border-[var(--color-theme-hover-border)!important] w-screen">
            <div className="flex flex-col justify-center items-center">
                <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-70 shadow-lg dark:bg-neutral-800 w-[540px] h-[200px] flex-grow">
                    <header className="flex justify-center">
                        {admin ? 
                            <div className="relative flex justify-center">
                                <button>
                                    <span role="img" aria-label="edit">
                                        ✏️
                                    </span>
                                </button>
                                <button onClick={handleUserDelete}>
                                    <span role="img" aria-label="delete">
                                        🗑
                                    </span>
                                </button>
                            </div>
                        : null}   
                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                            <div className="mr-8">
                                <img src={avatar_url} alt={`${username} Avatar`} className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] mt-4 h-40 w-40 object-cover border-2 rounded-full`}/>
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
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                                            <h3>Travel Distance: {travel_distance} Miles</h3>
                                        </div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                                            <h3> Email: {email} </h3>
                                        </div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } flex`}>
                                            <h3> Address: {address} </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                    <div className="flex my-4 justify-between min-w-screen ">
                        <div className="flex flex-col w-4/5 h-[calc(100vh-280px)] items-center ">
                            <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] ' } mb-2 font-extrabold border-b-4`}
                                    > {username}'s Games':
                            </label>
                            <div className="overflow-y-auto"> 
                                <GameList theme={theme} games={allGames}/>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/5 h-[calc(100vh-280px)]">
                            <div className="relative flex justify-center">
                                <button onClick={() => setMessage(message => !message)} className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`} >
                                    <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] font-extrabold'}`}
                                        >Message {username}?
                                    </span>
                                </button>            
                            </div>
                            {message ?
                                <MessageNew theme={theme} user={user} currentUser={currentUser} onSendMessage={onSendMessage}/>
                            : null} 
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default UserDetail