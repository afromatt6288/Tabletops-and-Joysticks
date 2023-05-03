import React from "react";
import { useHistory, Link } from "react-router-dom";

function GameItem({ game, edit, currentUser, onCurrentUserGames, games}) {
    const { id, title, image_url, type, genres, platforms, player_num_min, player_num_max, image_blob, description} = game

    const history = useHistory()

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
        <div>
            <h4>{title} | #{id}<span>{edit ? <button onClick={() => handleRemoveGameFromProfile(game)}> | Remove  🗑</button> : null}</span></h4>
            <span>
                <label>Type: <span>{type}</span> | </label>
                <label>Platforms: <span>{platforms}</span> | </label>
                <label>Genres: <span>{genres}</span> | </label>
                <span>{player_num_min} to {player_num_max} Players</span>
            </span>
            <Link to={`/games/${id}`}>
                <img src={image_url} alt={`${title} Image`} />
            </Link>
        </div>
    );
}

export default GameItem;

    