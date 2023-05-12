import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import UserItem from "./UserItem";
import UserSearch from "./UserSearch";
import { Card } from "semantic-ui-react";

function UserList({currentUser, users, games, theme}) {    
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [filterByGameType, setFilterByGameType] = useState("All")

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    // handle my User sort
    const notCurrentUsers = users.filter(user => user.id !== currentUser.id)
    const sortedUsers = [...notCurrentUsers].sort((user1, user2) => {
        if (sortBy === "Alphabetical") {
            return user1.username.localeCompare(user2.username)
        } else if (sortBy === "ID") {
            return user1.id - user2.id;
        // } else if (sortBy === "Distance") {
        //     return user1.travel_distance - user2.travel_distance;
        }
        return console.log('error on sort')
    })

    // handle my Type filter    
    const types = games.map((game)=> game.type)
    const allTypes = types.flat(1)
    const uniqueTypes = [...new Set(allTypes)]
    
    // Handle the filter output
    const filteredUsers = sortedUsers.filter((user) => {
        const matchGame = filterByGameType === "All" || user.inventories.some((inventory) => {
          return inventory.game && inventory.game.type === filterByGameType;
        });
        return matchGame;
      });

    // this is how I am handling the UserSearch function
    const displayedUsers = filteredUsers.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <div>
            <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-2 block rounded-lg bg-gray-600 bg-opacity-60 shadow-lg dark:bg-neutral-800 w-full md:w-auto">
                <UserSearch theme={theme} search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} filterByGameType={filterByGameType} onHandleGameTypeFilter={setFilterByGameType} types={uniqueTypes}/>
            </div>
            <section id="users" className="h-[calc(100vh-140px)] flex flex-col">
                <div className=" border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] overflow-y-auto w-full h-full border-4 block rounded-xl " style={{ padding: '1rem' }}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
                        {displayedUsers.map((user)=> (
                            <UserItem theme={theme} key={user.id} user={user} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserList;