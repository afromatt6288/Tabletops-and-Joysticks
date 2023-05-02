import React from "react";
import { Link } from "react-router-dom";

function GameItem({ game}) {
    const { id, title, image_url, type, genres, platforms, player_num_min, player_num_max, image_blob, description} = game

    return (
        <div>
            <p>{title} | #{id}</p>
            <span>
                <label>Type: <span>{type}</span> | </label>
                <label>Platforms: <span>{platforms}</span> | </label>
                <label>Genres: <span>{genres}</span> | </label>
                <span>{player_num_min} to {player_num_max} Players</span>
            </span>
            <Link to={`/games/${id}`}>
                <img src={image_url} alt={`${title} Image`} />
            </Link>
            <p>{description}</p>
        </div>
    );
}

export default GameItem;

    