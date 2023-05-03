import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import UserItem from "./UserItem";
import UserSearch from "./UserSearch";
import { Card } from "semantic-ui-react";

function UserList({currentUser, users, games}) {    
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
        } else if (sortBy === "ID Number") {
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
        <section id="users">
            <h2>T & J Users</h2>
            <div>
                <UserSearch search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} filterByGameType={filterByGameType} onHandleGameTypeFilter={setFilterByGameType} types={uniqueTypes}/>
            </div>
            <div>
                <div className="user-list">
                    <Card.Group className="cards" itemsPerRow={6}>
                        {displayedUsers.map((user)=> (
                            <UserItem key={user.id} user={user} />
                        ))}
                    </Card.Group>
                </div>
            </div>
        </section>
    );
}

export default UserList;