import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function NavBar({admin}) {

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    return (
        <section>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/games">Games</NavLink>
            <NavLink exact to="/users">Users</NavLink>
            <NavLink exact to="/games/new">Add Game</NavLink> 
        {admin ?  
            <NavLink exact to="/tbd">TBD</NavLink>            
        : null }
        </nav>
        </section>
    );
}

export default NavBar;