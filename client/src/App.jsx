import React, {useState, useEffect} from "react";
import { Switch, Route, useHistory  } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import GameList from "./components/GameList";
import GameDetail from "./components/GameDetail";
import GameNew from "./components/GameNew";
import Login from "./components/Login";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import UserProfile from "./components/UserProfile";
import TBD from "./components/TBD";

function App() {
    const [currentUser, setCurrentUser] = useState("")
    const [seen, setSeen] = useState(false)
    const [admin, setAdmin] = useState(false)
    // const [isDarkMode, setIsDarkMode] = useState(false)

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    // forces any refreshing of the app to bring the user back to the home page instead of logging them out. 
    useEffect(() => {
        history.replace('/');
      }, [history]);
       
    // Check users cookies to keep them logged in
    useEffect(() => {
        fetch("api/check_session")
        .then((response) => {
            if (response.ok) {
                response.json()
                .then((currentUser) => {
                    setCurrentUser(currentUser)
                });
            }
        });
    }, []);

    // Update the admin state variable when currentUser changes
    useEffect(() => {
      if (currentUser) {
        setAdmin(currentUser.is_admin);
      }
    }, [currentUser]);

////////// 
// USER //
//////////

    // gather my User Data
    const [users, setUsers] = useState([]) 
    useEffect(() => {
        fetch("api/users")
            .then(r => r.json())
            .then(data => {
                setUsers(data)
            })
    }, [])

    // Handle User Add, Delete, & Edit
    function handleAddUser(addUser) {
        const updatedUsers = [...users, addUser]
        setUsers(updatedUsers);
    }

    function handleUserDelete(id) {
        const updatedUsers = users.filter(user => user.id !== id)
        setUsers(updatedUsers)   
        console.log(users)
    }

    function handleEditProfile(currentUser){
        console.log(currentUser)
        setCurrentUser(currentUser)
    }

    function handleLogoutClick() {
        history.push(`/`)
        fetch("api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setCurrentUser(null);
            history.push(`/`)
          }
        });
      }

////////// 
// GAME //
//////////
        
    // Gather my Game Data
    const [games, setGames] = useState([]);
    useEffect(() => {
        fetch("api/games")
            .then(r => r.json())
            .then(data => {
                setGames(data)
            })
    }, [])

    // Handle Game Add & Delete
    function handleGameAdd(addItem) {
        const updatedGames = [...games, addItem]
        setGames(updatedGames);
    }

    function handleGameDelete(id) {
        const updatedGames = games.filter(game => game.id !== id)
        setGames(updatedGames)
    }

/////////////
// MESSAGE //
/////////////

    // Gather my Message Data
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch("api/messages")
            .then(r => r.json())
            .then(data => {
                setMessages(data)
            })
    }, [])

    // Handle Message Send, Delete, & Edit
    function handleSendMessage(addMessage){
        const updatedMessages = [...messages, addMessage]
        setMessages(updatedMessages)
    }

    function handleDeleteMessage(id) {
        const updatedMessages = messages.filter(message => message.id !== id)
        setMessages(updatedMessages)
    }
    
    function handleEditMessage(editedMessage) {
        const editedMessages = messages.map(message => {
            if (message.id === editedMessage.id) {
                return editedMessage
            } else {
                return message
            }
        })
        setMessages(editedMessages)
    }

//////////
// MISC //
//////////

    // Handle Login and registration Pop-up
    function togglePop () {
        setSeen(!seen);
    };

////////////
// RETURN //
////////////

    return (
        <>
            <div>
                <header> 
                <h1 className="text-red-500" >Tabletops & Joysticks</h1>
                {currentUser ? 
                    <div>
                        <button onClick={togglePop} >PROFILE</button>
                        {seen ? <UserProfile key={currentUser.id} currentUser={currentUser} setCurrentUser={setCurrentUser} onUserDelete={handleUserDelete} onLogoutClick={handleLogoutClick} onEditProfile={handleEditProfile} users={users} messages={messages} onSendMessage={handleSendMessage} onDeleteMessage={handleDeleteMessage} onEditMessage={handleEditMessage}/> : null}                        
                    </div>
                : 
                    <div>
                        <button onClick={togglePop} >LOGIN</button>
                        {seen ? <Login toggle={togglePop} currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} onAddUser={handleAddUser}/> : null}
                    </div>
                }
                </header>
                {currentUser ? <NavBar admin={admin}/> : seen ? null : <h2>Please Log In</h2>}
                {currentUser ? <Switch>
                    <Route exact path="/">
                        <Home currentUser={currentUser}/>
                    </Route>
                    <Route exact path="/users">
                        <UserList currentUser={currentUser} users={users} games={games}/>
                    </Route>
                    <Route exact path="/users/:id">
                        <UserDetail admin={admin} currentUser={currentUser} users={users} games={games} onUserDelete={handleUserDelete} onSendMessage={handleSendMessage}/>
                    </Route>
                    {admin ? 
                    <Route exact path="/tbd">
                        <TBD/>
                    </Route> : null }
                    <Route exact path="/games/new">
                        <GameNew key={games.id} games={games} onGameAdd={handleGameAdd}/>
                    </Route>
                    <Route exact path="/games/:id">
                        <GameDetail admin={admin} onGameDelete={handleGameDelete}/>
                    </Route>
                    <Route exact path="/games">
                        <GameList currentUser={currentUser} games={games} users={users}/>
                    </Route>
                    <Route path="*">
                        <h1>404 not found</h1>
                    </Route>
                </Switch> : null
                }
            </div>
        </>
    );
}

export default App;