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
        
    const {username, email, address, city, state, country, zipcode, avatar_url, stars, travel_distance, is_active, is_admin} = user
    
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
        <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] border-[var(--color-theme-border)!important]  hover:border-[var(--color-theme-hover-border)!important] w-screen">
            <div className="flex flex-col justify-center items-center">
                <div className=" flex gap-20">
                    <div className="">
                        <div className="relative flex flex-col justify-center items-center">
                            <button onClick={() => setMessage(message => !message)} className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 px-1 py-1 rounded`} >
                                <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-gradient-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] font-extrabold'}`}
                                    >Message {username}?
                                </span>
                            </button>            
                            {message ?
                                <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-70 shadow-lg dark:bg-neutral-800 w-[250px] h-[165px] mt-1">
                                    <MessageNew theme={theme} user={user} currentUser={currentUser} onSendMessage={onSendMessage}/>
                                </div>
                            : null} 
                        </div>
                    </div>
                    <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-70 shadow-lg dark:bg-neutral-800 w-[500px] h-[200px] flex-grow">
                        <header className="flex justify-center">
                            {admin ? 
                                <div className="relative flex justify-center">
                                    <button>
                                        <span role="img" aria-label="edit">
                                            ✏️
                                        </span>
                                    </button>
                                    <button onClick={handleUserDelete} >
                                        <span role="img" aria-label="delete">
                                            🗑
                                        </span>
                                    </button>
                                </div>
                            : null}   
                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mx-auto flex`}>
                                <div className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] mt-4 h-40 w-40 object-cover border-2 rounded-full overflow-hidden mr-8 flex-shrink-0`}>
                                    <img src={avatar_url} alt={`${username} Avatar`} className="object-contain h-full w-full"/>
                                </div>                
                                <div className="flex-grow">
                                    <div className=" mb-2">
                                        <div>
                                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } mt-4 mr-2 flex`} >
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
                                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } `}>
                                                <h3>Travel Distance: {travel_distance} Miles</h3>
                                            </div>
                                            {/* <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } `}>
                                                <h3> Email: {email} </h3>
                                            </div> */}
                                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } `}>
                                                <h3> Zipcode: {zipcode} </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                </div>
                <div className="flex my-4 justify-center min-w-screen ">
                    <div className="flex flex-col w-screen items-center h-[calc(100vh-325px)] ">
                        <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] ' } mb-2 font-extrabold border-b-4`}
                                > {username}'s Games':
                        </label>
                        <div >
                            <div className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 rounded-xl overflow-y-auto overflow-hidden h-[calc(100vh-343px)]`}> 
                                <GameList theme={theme} games={allGames}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserDetail