import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import GameItem from "./GameItem";
import GameSearch from "./GameSearch";

function GameList({theme, games, edit, currentUser, onCurrentUserGames}) {
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [filterByType, setFilterByType] = useState("All")
    const [filterByGenre, setFilterByGenre] = useState("All")
    const [filterByPlatform, setFilterByPlatform] = useState("All")

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    // handle my Game sort
    const sortedGames = [...games].sort((game1, game2) => {
        if (sortBy === "Alphabetical") {
            return game1.title.localeCompare(game2.title)
        } else if (sortBy === "ID") {
            return game1.id - game2.id;
        } else if (sortBy === "Maximum Number of Players") {
            return game2.player_num_max - game1.player_num_max;
        // } else if (sortBy === "Distance") {
        //     return game1.user.travel_distance - game2.user.travel_distance;
        }
        return console.log('error on sort')
    })

    // handle my Type filter    
    const types = games.map((game)=> game.type)
    const allTypes = types.flat(1)
    const uniqueTypes = [...new Set(allTypes)]
    const filteredByTypeGames = sortedGames.filter((game)=> filterByType === "All" ? sortedGames : game.type === filterByType)

    // handle my Genre filter    
    const genres = games.map((game)=> game.genres.split(", "))
    const allGenres = genres.flat(1)
    const uniqueGenres = [...new Set(allGenres)].sort()
    const filteredByGenreGames = filteredByTypeGames.filter((game)=> filterByGenre === "All" ? filteredByTypeGames : game.genres.includes(filterByGenre))

    // handle my Platform filter    
    const platforms = games.map((game)=> game.platforms.split(", "))
    const allPlatforms = platforms.flat(1)
    const uniquePlatforms = [...new Set(allPlatforms)].sort()
    const filteredByPlatformGames = filteredByGenreGames.filter((game)=> filterByPlatform === "All" ? filteredByGenreGames : game.platforms.includes(filterByPlatform))
    
    // this is how I am handling the GameSearch function
    const displayedGames = filteredByPlatformGames.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <div>
            <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important]  border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-2 block rounded-lg bg-gray-600 bg-opacity-60 shadow-lg dark:bg-neutral-800 w-full md:w-auto">
                <GameSearch theme={theme} search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} filterByType={filterByType} filterByGenre={filterByGenre} filterByPlatform={filterByPlatform} onHandleTypeFilter={setFilterByType} onHandleGenreFilter={setFilterByGenre} onHandlePlatformFilter={setFilterByPlatform} types={uniqueTypes} genres={uniqueGenres} platforms={uniquePlatforms}/>
            </div>
            <section id="games" className="h-[calc(100vh-205px)] flex flex-col">
                <div className=" border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] overflow-y-auto w-full h-full border-4 block rounded-xl " style={{ padding: '1rem' }}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
                        {displayedGames.map((game)=> (
                            <GameItem key={game.id} theme={theme} game={game} edit={edit} currentUser={currentUser} onCurrentUserGames={onCurrentUserGames} games={games}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default GameList;