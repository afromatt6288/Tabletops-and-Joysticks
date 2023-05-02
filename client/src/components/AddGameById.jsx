import { useState } from "react"
import { useHistory } from "react-router-dom";

function AddGameByID({currentUser, setCurrentUser, onAddGameToProfile}){
    const [gameId, setGameId] = useState("")

    const history = useHistory();

    function handleCurrentUser(user) {
        setCurrentUser
    }
    function handleSortChange(e){
        onSortChange(e.target.value)
      }

    function handleAddGameToProfile(e){
        e.preventDefault()
        history.push(`/`)
        const formData = {
            user_id : parseInt(currentUser.id),
            game_id : parseInt(gameId),
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
                    setGameId("")
                    history.push(`/`)
            })}
    })
}

    return (
    <div>
        <form onSubmit={handleAddGameToProfile}>
            <label> | Add Game By Id: </label>
            <input type = "number" placeholder="Game ID" id = "input-game-id" value={gameId} onChange={e=>{setGameId(e.target.value)}}></input>
            <button type="submit"> Submit</button>
        </form>
    </div>
    )
}

export default AddGameByID