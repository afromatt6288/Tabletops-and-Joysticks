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
            <input type="number" placeholder="Game ID" value={gameId} onChange={e=>{setGameId(e.target.value)}}></input>
            <br/>
            <input type="name" placeholder="Game Title" value={gameTitle} onChange={e=>{setGameTitle(e.target.value)}}></input>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default AddGameByNameId