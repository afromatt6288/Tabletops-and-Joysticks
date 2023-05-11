import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function GameItem({ game, edit, currentUser, onCurrentUserGames, games, theme}) {
    const { id, title, image_url, type, genres, platforms, player_num_min, player_num_max, image_blob, description} = game

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    function handleRemoveGameFromProfile(gameToRemove){
        console.log(currentUser)
        const invToDelete = currentUser.inventories.find(inventory => inventory.game_id === gameToRemove.id)
        fetch(`api/inventories/${parseInt(invToDelete.id)}`, {
            method: "DELETE"
        })
            console.log(games)
            const updatedGames = games.filter(game => game.id !== gameToRemove.id)
            onCurrentUserGames(updatedGames);
            history.push(`/`)
    }

    return (
        <div className="relative h-full text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-60 shadow-lg dark:bg-neutral-800 w-full md:w-auto min-w-170">
            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' } text-center`}>
                <h4>{title} | #{id}<span>{edit ? <button onClick={() => handleRemoveGameFromProfile(game)}> | Remove  🗑</button> : null}</span></h4>
                <div className={`border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] mt-4 h-40 w-40 border-2 rounded-lg mx-auto`}>
                    <Link to={`/games/${id}`}>
                        <img src={`/${image_url}`} alt={`${title} Image`} className="object-contain h-full w-full"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GameItem;

