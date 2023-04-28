import React from "react";
import UserCard from "./UserCard"
import { Card } from "semantic-ui-react"

function Users({users, onUserDelete}) {

    const sortedUsers = [...users].sort((user1, user2) => {
            return user1.username.localeCompare(user2.username)
    })   

    return (
        <section id="users">
            <h3>Users</h3>
            <div>
                <Card.Group className="cards" itemsPerRow={6}>
                    {sortedUsers.map((user)=> (
                    <UserCard key={user.id} user={user} onUserDelete={onUserDelete}/>
                    ))}
                </Card.Group>
            </div>
        </section>
    )
}

export default Users