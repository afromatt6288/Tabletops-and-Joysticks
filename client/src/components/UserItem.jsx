import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function UserItem({user}) {
    const {id, username, email, address, avatar_url, stars, travel_distance, is_active, is_admin} = user

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

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