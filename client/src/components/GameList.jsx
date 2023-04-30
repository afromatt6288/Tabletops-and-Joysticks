import React, { useState } from "react";
import GameItem from "./GameItem";
import GameSearch from "./GameSearch";
import { Card } from "semantic-ui-react";

function GameList({games}) {
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [filterByType, setFilterByType] = useState("All")
    const [filterByGenre, setFilterByGenre] = useState("All")
    const [filterByPlatform, setFilterByPlatform] = useState("All")

    // handle my Game sort
    const sortedGames = [...games].sort((game1, game2) => {
        if (sortBy === "Alphabetical") {
            return game1.title.localeCompare(game2.title)
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
        <section id="games">
            <h2>T&J Games</h2>
            <div>
                <GameSearch search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} filterByType={filterByType} filterByGenre={filterByGenre} filterByPlatform={filterByPlatform} onHandleTypeFilter={setFilterByType} onHandleGenreFilter={setFilterByGenre} onHandlePlatformFilter={setFilterByPlatform} types={uniqueTypes} genres={uniqueGenres} platforms={uniquePlatforms}/>
            </div>
            <div>
                <div>
                    <Card.Group itemsPerRow={6}>
                        {displayedGames.map((game)=> (
                        <GameItem key={game.id} game={game}/>
                        ))}
                    </Card.Group>
                </div>
            </div>
        </section>
    );
}

export default GameList;