import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, Tab, initTE } from "tw-elements";

function NavBar({admin, theme}) {

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple, Tab });
    }, []);

    return (
        <ul className="mb-3 flex list-none flex-row flex-wrap border-b-0 pl-0" data-te-nav-ref>
            <li role="presentation">
                <NavLink exact to="/"
                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} hover:border-[var(--color-theme-hover-border)!important] focus:border-b-2 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:border-b-2 focus:border-b-2 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`}
                    activeClassName={`${theme === 'multi' ? 'text-multi bg-multi-gradient-hover border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-hover-border)!important] '} border-b-2 `}
                >Home</NavLink>
            </li>
            <li role="presentation">
                <NavLink exact to="/games"
                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} hover:border-[var(--color-theme-hover-border)!important] focus:border-b-2 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:border-b-2 focus:border-b-2 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`}
                    activeClassName={`${theme === 'multi' ? 'text-multi bg-multi-gradient-hover border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-hover-border)!important] '} border-b-2 `}
                >Games</NavLink>
            </li>
            <li role="presentation">
                <NavLink exact to="/users"
                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} hover:border-[var(--color-theme-hover-border)!important] focus:border-b-2 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:border-b-2 focus:border-b-2 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`}
                    activeClassName={`${theme === 'multi' ? 'text-multi bg-multi-gradient-hover border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-hover-border)!important] '} border-b-2 `}
                >Users</NavLink>
            </li>
            <li role="presentation">
                <NavLink exact to="/games/new"
                    className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} hover:border-[var(--color-theme-hover-border)!important] focus:border-b-2 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:border-b-2 focus:border-b-2 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`}
                    activeClassName={`${theme === 'multi' ? 'text-multi bg-multi-gradient-hover border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-hover-border)!important] '} border-b-2 `}
                >Add Game</NavLink>
            </li>
            {admin ?  
                <li role="presentation">
                    <NavLink exact to="/tbd"
                        className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} hover:border-[var(--color-theme-hover-border)!important] focus:border-b-2 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:border-b-2 focus:border-b-2 dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400`}
                        activeClassName={`${theme === 'multi' ? 'text-multi bg-multi-gradient-hover border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-hover-text)!important] border-[var(--color-theme-hover-border)!important] '} border-b-2 `}
                    >TBD</NavLink>
                </li>
            : null }
        </ul>
    );
}

export default NavBar;