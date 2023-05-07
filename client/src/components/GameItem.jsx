import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function GameItem({ game, edit, currentUser, onCurrentUserGames, games}) {
    const { id, title, image_url, type, genres, platforms, player_num_min, player_num_max, image_blob, description} = game

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    function handleRemoveGameFromProfile(gameToRemove){
        console.log(currentUser)
        const invToDelete = currentUser.inventories.find(inventory => inventory.game_id === gameToRemove.id)
        fetch(`api/inventories/${parseInt(invToDelete.id)}`, {
            method: "DELETE"
        })
            console.log(games)
            const updatedGames = games.filter(game => game.id !== gameToRemove.id)
            onCurrentUserGames(updatedGames);
            history.push(`/`)
    }

    return (
        <div className="relative h-full border-2 rounded-lg border-purple-500">
            <h4>{title} | #{id}<span>{edit ? <button onClick={() => handleRemoveGameFromProfile(game)}> | Remove  🗑</button> : null}</span></h4>
            <Link to={`/games/${id}`}>
                <img src={image_url} alt={`${title} Image`} className="h-40 w-40 object-cover"/>
            </Link>
        </div>
    );
}

export default GameItem;

    