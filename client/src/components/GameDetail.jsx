import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import { Card } from "semantic-ui-react"

function GameDetail({admin, onGameDelete}) {
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
    const allusers = game.inventories.map((inv)=>inv.user)
    
    function handleDeleteClick() {
        history.push(`/`)
        fetch(`api/games/${id}`, {
          method: "DELETE"
        }) 
        onGameDelete(id)
        history.push(`/games`)       
    }

    return (<div>
        <section>
            <header>
                <div>
                    <span>{title} | #{id}</span>
                </div>
            </header>
            <div>
                <span>
                    <label>Type: <span>{type}</span> | </label>
                    <label>Platforms: <span>{platforms}</span> | </label>
                    <label>Genres: <span>{genres}</span> | </label>
                    <span>{player_num_min} to {player_num_max} Players</span>
                </span>
                <div>
                    <img src={image_url} alt={title}/>
                </div>
                <p>Description: {description}</p>
                <h2>Users:</h2>
                <div>
                    <Card.Group className="cards" itemsPerRow={2}>
                        {allusers && allusers.map((user, index) => (
                            <div key={String(user.id)+"ind"+String(index)}>
                                <Link to={`/users/${user.id}`}>
                                    <h4>{user.username} | #{user.id}</h4>
                                </Link>
                            </div>
                        ))}
                    </Card.Group>  
                </div>               
            </div>
            {admin ? (
            <div>
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
        </section>
        </div>
    );
}

export default GameDetail;