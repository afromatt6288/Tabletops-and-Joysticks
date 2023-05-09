import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function AddGameByNameId({currentUser, onAddGameToProfile, theme}){
    const [gameId, setGameId] = useState("")
    const [gameTitle, setGameTitle] = useState("")

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    function handleAddGameToProfile(game_id){
        history.push(`/`)
        const formData = {
            user_id : parseInt(currentUser.id),
            game_id : parseInt(game_id),
        }
        console.log(formData)
        fetch("api/inventories", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        .then(r => {
            if (r.ok) {
                r.json()
                .then(inv => {
                    onAddGameToProfile(inv)
                    console.log(inv)
                    setGameId("")
                    setGameTitle("")
                    history.push(`/`)
                })
            }
        })
    }

    function handleParseGameTitleSubmit(e){
        e.preventDefault()
        if (gameTitle !== "" && gameTitle != null){
            fetch("api/games")
            .then(r => {
                if (r.ok) {
                    r.json()
                    .then(games=>{
                        for (let game of games){
                            if (game.title === gameTitle){
                                return game.id
                            }
                        }
                        return -1
                    })
                    .then(parsedId=>{
                        if (parsedId === -1){
                            return null
                        }
                        handleAddGameToProfile(parsedId)
                    })
                }
            })
        } else if (gameId !== null && gameId !== 0){
                handleAddGameToProfile(gameId)
        }
    }
        
    return (
    <div>
        <form onSubmit={e=>{handleParseGameTitleSubmit(e)}}>
        <div className="border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-2 rounded-full mb-4 mt-2 pt-2 flex items-center justify-center">
            {/* <!--Game Title input--> */}
            <div className="relative mb-2" data-te-input-wrapper-init>
                <input type="text" value={gameTitle} onChange={e => setGameTitle(e.target.value)} 
                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                />
                <label 
                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                    >Game Title
                </label>
            </div>
            {/* <!--Game Id input--> */}
            <div className="relative mb-2" data-te-input-wrapper-init>
                <input type="number" value={gameId} onChange={e => setGameId(e.target.value)} 
                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                />
                <label 
                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                    >Game Id
                </label>
            </div>
                <button type="submit" 
                    className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mx-4 rounded mb-2 px-6 py-1`} >
                    <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] font-extrabold'}`}
                        >Add Game
                    </span>
                </button>
            </div>
            
        </form>
    </div>
    )
}

export default AddGameByNameId