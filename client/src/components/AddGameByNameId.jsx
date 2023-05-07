import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function AddGameByNameId({currentUser, onAddGameToProfile}){
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
        <div className="flex items-center justify-center">
            {/* <!--Game Title input--> */}
            <div className="relative mb-4" data-te-input-wrapper-init>
                <input type="text" value={gameTitle} onChange={e => setGameTitle(e.target.value)} 
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.10rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                />
                <label 
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.10rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Game Title
                </label>
            </div>
            {/* <!--Game Id input--> */}
            <div className="relative mb-4" data-te-input-wrapper-init>
                <input type="number" value={gameId} onChange={e => setGameId(e.target.value)} 
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.10rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                />
                <label 
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.10rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Game Id
                </label>
            </div>
            <button type="submit" 
            className="mx-4 px-6 py-1 bg-purple-500 text-white rounded">Add Game</button>
            </div>
        </form>
    </div>
    )
}

export default AddGameByNameId