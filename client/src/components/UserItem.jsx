import React from "react";
import { Link } from "react-router-dom";

function UserItem({user}) {
    const {id, username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = user

    return (
        <div>
            <Link to={`/users/${id}`}>
                <img src={avatar_url} alt={`${username} Avatar`}/>
            </Link>
            <p>{username} | #{id}</p>
            <p>{stars} Stars</p>
            <p>Status: {is_active ? "Online" : "Offline"}</p>
        </div>
    )
}

export default UserItem