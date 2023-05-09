import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import UserList from "./UserList";
import { Card } from "semantic-ui-react"

function GameDetail({admin, onGameDelete, currentUser, theme}) {
    const [game, setGame] = useState(null);    
    
/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()
    const { id } = useParams()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    useEffect(() => {
        fetch(`/api/games/${id}`)
            .then(r => r.json())
            .then(data => {
                console.log(data)
                setGame(data)});
        }, [])

        if (!game) return <h2>Loading...</h2>
    
    const { title, image_url, type, genres, platforms, player_num_min, player_num_max, image_blob, description} = game    
    const allUsers = game.inventories.map((inv)=>inv.user)
    const gamesArray = Array.from(game)
    
    function handleDeleteClick() {
        history.push(`/`)
        fetch(`api/games/${id}`, {
          method: "DELETE"
        }) 
        onGameDelete(id)
        history.push(`/games`)       
    }

    return (
        <div className="text-white">
            <header className="flex justify-center">
                {admin ? 
                    <div className="relative flex justify-center">
                        <button>
                            <span role="img" aria-label="edit">
                                ✏️
                            </span>
                        </button>
                        <button onClick={handleDeleteClick}>
                            <span role="img" aria-label="delete">
                                🗑
                            </span>
                        </button>
                    </div>
                 : null}        
                <div className="flex">
                    <div className="mr-8">
                        <img src={image_url} alt={`${title} Image`} className="h-40 w-40 object-cover"/>
                    </div> 
                    <div className="flex-grow">
                        <div className=" mb-2">
                            <div>
                                <div className="flex mt-4">
                                    {title} | #{id}
                                </div>
                                <div className="flex">
                                    <h3>Type: {type} </h3>
                                </div>
                                <div className="flex">
                                    <h3>Platforms: {platforms} </h3>
                                </div>
                                <div className="flex">
                                    <h3>Genres: {genres} </h3>
                                </div>
                                <div className="flex">
                                    <h3>{player_num_min} to {player_num_max} Players</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex justify-center">
                <p className="w-3/4">Description: {description}</p>
            </div>
            <label className="relative flex justify-center my-4"> {title}'s Users':</label>
            <div className="flex justify-center my-4">
                <div className="flex flex-col overflow-y-auto w-4/5 h-[calc(100vh-370px)]">
                    <UserList users={allUsers} currentUser={currentUser} games={gamesArray}/>
                </div>
            </div>                
        </div>
    );
}

export default GameDetail;


              


//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//         <div className="flex">
//             <div className="flex flex-col overflow-y-auto w-4/5 h-[calc(100vh-280px)]">
//                 <label className="relative flex justify-center"> {username}'s Games':</label>
//                 <GameList games={allGames}/>
//             </div>
//             <div className="flex flex-col overflow-y-auto w-1/5 h-[calc(100vh-280px)]">
//                 <div className="relative flex justify-center">
//                     <button onClick={() => setMessage(message => !message)} className="mx-4 px-1 py-1 bg-purple-500 text-white rounded">Message {username}?</button>            
//                 </div>
//                 {message ?
//                     <MessageNew user={user} currentUser={currentUser} onSendMessage={onSendMessage}/>
//                 : null} 
//             </div>
//         </div>
//     </div>
// )