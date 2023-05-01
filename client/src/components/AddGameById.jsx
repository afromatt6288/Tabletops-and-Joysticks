import { useState } from "react"

function AddItemByID({userId}){
    const [gameId, setGameId] = useState(null)

    function handleSubmit(){
        fetch("/inventories", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                user_id:userId,
                game_id:gameId
            })
        }).then(resp=>resp.json())
    }

    return (
    <div>
        <form onSubmit={()=>{handleSubmit()}}>
            <input type = "number" placeholder="Game ID" id = "input-game-id" value={gameId} onChange={e=>{setGameId(e.target.value)}}></input>
            <br/>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default AddItemByID