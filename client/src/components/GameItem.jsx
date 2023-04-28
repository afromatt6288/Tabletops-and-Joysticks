import React from "react";
import { Link } from "react-router-dom";

function GameItem({ game}) {
    const { id, title, image_url, type, genres, platform, player_num_min, player_num_max, image_blob, description} = game

    return (
        <div>
            <Link to={`/games/${id}`}>
                <img src={image_url} alt={title} />
            </Link>
            <p>{title} | #{id}</p>
            <p>{genres}</p>
            <p>{platform}</p>
            <p>{player_num_min}</p>
            <p>{player_num_max}</p>
            <p>{description}</p>
            <div>
                <p>{type}</p>
            </div>
        </div>
    );
}

export default GameItem;

    