import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import UserList from "./UserList";

function GameDetail({admin, onGameDelete, currentUser, theme}) {
    const [game, setGame] = useState(null);    
    
/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()
    const { id } = useParams()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    useEffect(() => {
        fetch(`/api/games/${id}`)
            .then(r => r.json())
            .then(data => {
                console.log(data)
                setGame(data)});
        }, [])

        if (!game) return <h2>Loading...</h2>

        
    const { title, image_url, type, genres, platforms, player_num_min, player_num_max, image_blob, description} = game    
    console.log(image_url)
    const allUsers = game.inventories.map((inv)=>inv.user)
    const gamesArray = Array.from(game)
    
    function handleDeleteClick() {
        history.push(`/`)
        fetch(`api/games/${id}`, {
          method: "DELETE"
        }) 
        onGameDelete(id)
        history.push(`/games`)       
    }

    return (
        <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] border-[var(--color-theme-border)!important]  hover:border-[var(--color-theme-hover-border)!important] w-screen">
            <div className="flex flex-col justify-center items-center">
                <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-70 shadow-lg dark:bg-neutral-800 w-[540px] h-[300px] flex-grow">
                    <header className="flex justify-center">
                        {admin ? 
                            <div className="relative flex justify-center">
                                <button>
                                    <span role="img" aria-label="edit">
                                        ✏️
                                    </span>
                                </button>
                                <button onClick={handleDeleteClick}>
                                    <span role="img" aria-label="delete">
                                        🗑
                                    </span>
                                </button>
                            </div>
                        : null}        
                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex`}>
                            <div className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] mt-4 h-40 w-40 border-2 rounded-lg mr-8`}>
                                <img src={`/${image_url}`} alt={`${title} Image`} className="object-contain h-full w-full"/>
                            </div> 
                            <div className="flex-grow">
                                <div className=" mb-2">
                                    <div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex mt-4`}> 
                                            {title} | #{id}
                                        </div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex`}>
                                            <h3>Type: {type} </h3>
                                        </div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex`}>
                                            <h3>Platforms: {platforms} </h3>
                                        </div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex`}>
                                            <h3>Genres: {genres} </h3>
                                        </div>
                                        <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex`}>
                                            <h3>{player_num_min} to {player_num_max} Players</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="flex justify-center">
                        <p className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  ' } flex w-5/6`}
                            >Description: {description}
                        </p>
                    </div>
                </div>
                    <div className="flex my-5 justify-center text-center min-w-screen">
                        <div className="flex flex-col w-screen ml-9 mr-9 pr-2 pl-2  ">
                            <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] ' } mb-2 font-extrabold border-b-4`}
                                > {title}'s Users':
                            </label>
                            <div className="flex justify-center">
                                <div className="flex flex-col overflow-y-auto h-[calc(100vh-470px)] w-screen">
                                    <UserList users={allUsers} currentUser={currentUser} games={gamesArray} theme={theme}/>
                                </div>
                            </div>
                        </div>
                    </div>                
            </div>
        </div>
    );
}

export default GameDetail;