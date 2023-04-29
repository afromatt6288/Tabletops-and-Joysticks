import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({admin}) {
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