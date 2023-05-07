import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import UserList from "./UserList";
import { Card } from "semantic-ui-react"

function GameDetail({admin, onGameDelete, currentUser}) {
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
        <div className="text-white">
            <header className="flex justify-center">
                {admin ? (
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
                ) : null}
                <div>
                    <span>{title} | #{id}</span>
                </div>
            </header>
                <div className="flex justify-center">
                    <span>
                        <label>Type: <span>{type}</span> | </label>
                        <label>Platforms: <span>{platforms}</span></label>
                        </span>
                </div>
                <div className="flex justify-center">
                    <span>
                        <label>Genres: <span>{genres}</span> | </label>
                        <span>{player_num_min} to {player_num_max} Players</span>
                    </span>
                </div>
                <div className="flex justify-center">
                    <div>
                        <img src={image_url} alt={title}/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <p className="w-1/2">Description: {description}</p>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col overflow-y-auto w-4/5 h-[calc(100vh-280px)]">
                    <label className="relative flex justify-center"> {title}'s Users':</label>
                    <UserList users={allUsers} currentUser={currentUser} games={gamesArray}/>
                </div>
                    {/* <div>
                        <Card.Group className="cards" itemsPerRow={2}>
                            {allUsers && allUsers.map((user, index) => (
                                <div key={String(user.id)+"ind"+String(index)}>
                                    <Link to={`/users/${user.id}`}>
                                        <h4>{user.username} | #{user.id}</h4>
                                    </Link>
                                </div>
                            ))}
                        </Card.Group>  
                    </div>                */}
                </div>
                
        </div>
    );
}

export default GameDetail;