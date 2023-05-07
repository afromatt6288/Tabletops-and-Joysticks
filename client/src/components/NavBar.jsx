import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, Tab, initTE } from "tw-elements";

function NavBar({admin}) {

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple, Tab });
    }, []);

    return (
        <ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0" data-te-nav-ref>
            <li role="presentation">
                <NavLink exact to="/"
                    className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-purple-300 hover:text-purple-400 hover:border-b-2 hover:border-purple-400 focus:text-purple-400 focus:border-b-2 focus:border-purple-400 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    activeClassName="text-purple-600 border-b-2 border-purple-600"                    
                >Home</NavLink>
            </li>
            <li role="presentation">
                <NavLink exact to="/games"
                    className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-purple-300 hover:text-purple-400 hover:border-b-2 hover:border-purple-400 focus:text-purple-400 focus:border-b-2 focus:border-purple-400 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    activeClassName="text-purple-600 border-b-2 border-purple-600"
                >Games</NavLink>
            </li>
            <li role="presentation">
                <NavLink exact to="/users"
                    className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-purple-300 hover:text-purple-400 hover:border-b-2 hover:border-purple-400 focus:text-purple-400 focus:border-b-2 focus:border-purple-400 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    activeClassName="text-purple-600 border-b-2 border-purple-600"
                >Users</NavLink>
            </li>
            <li role="presentation">
                <NavLink exact to="/games/new"
                    className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-purple-300 hover:text-purple-400 hover:border-b-2 hover:border-purple-400 focus:text-purple-400 focus:border-b-2 focus:border-purple-400 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    activeClassName="text-purple-600 border-b-2 border-purple-600"
                >Add Game</NavLink>
            </li>
            {admin ?  
            <li role="presentation">
                <NavLink exact to="/tbd"
                    className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-purple-300 hover:text-purple-400 hover:border-b-2 hover:border-purple-400 focus:text-purple-400 focus:border-b-2 focus:border-purple-400 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    activeClassName="text-purple-600 border-b-2 border-purple-600"
                >TBD</NavLink>
            </li>
            : null }
        </ul>
    );
}

export default NavBar;