import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function UserItem({user, theme}) {
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
        <div className="relative h-full text-[var(--color-theme-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-60 shadow-lg dark:bg-neutral-800 w-full md:w-auto min-w-170">
            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' } text-center`}>
                <div className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] mt-4 h-40 w-40 border-2 rounded-full overflow-hidden mx-auto`}>
                    <Link to={`/users/${id}`}>
                        <img src={avatar_url} alt={`${username} Avatar`} className="object-contain h-full w-full"/>
                    </Link>
                </div>
                <p >{username} | #{id}</p>
                <p>{stars} Stars</p>
                <p>Status: {is_active ? "Online" : "Offline"}</p>
            </div>   
        </div>
    )
}

export default UserItem

