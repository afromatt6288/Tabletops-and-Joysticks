import React from "react";
import { Link } from "react-router-dom";

function GameItem({ game}) {
    const { id, title, image_url, type, genres, platform, player_num_min, player_num_max, image_blob, description} = game

    return (
        <div>
            <Link to={`/games/${id}`}>
                <img src={image_url} alt={`${title} Image`} />
            </Link>
            <p>{title} | #{id}</p>
            <p>{type}</p>
            <p>{platform}</p>
            <p>{genres}</p>
            <p>{player_num_min} to {player_num_max} Players</p>
            <p>{description}</p>
        </div>
    );
}

export default GameItem;

    