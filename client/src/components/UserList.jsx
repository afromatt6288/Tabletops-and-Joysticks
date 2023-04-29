import React, { useState } from "react";
import UserItem from "./UserItem";
import UserSearch from "./UserSearch";
import { Card } from "semantic-ui-react";

function UserList({users, games}) {    
    const [search, setSearch] = useState("")
    const [filterByGameType, setFilterByGameType] = useState("All")

    // Set my users in Alphabetical order
    const alphabeticalUsers = [...users].sort((user1, user2) =>  user1.username.localeCompare(user2.username))


    // handle my Category filter    
    const types = games.map((game)=> game.type)
    const allTypes = types.flat(1)
    const uniqueTypes = [...new Set(allTypes)]
    
    // Handle the filter output
    const filteredUsers = alphabeticalUsers.filter((user) => {
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
                <UserSearch search={search} onSearchChange={setSearch} filterByGameType={filterByGameType} onHandleGameTypeFilter={setFilterByGameType} types={uniqueTypes}/>
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