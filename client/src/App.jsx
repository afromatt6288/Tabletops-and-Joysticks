import React, {useState, useEffect} from "react";
import { Switch, Route, useHistory  } from "react-router-dom";
import { Datepicker, Input, initTE } from "tw-elements";
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
// import { MessageList } from "semantic-ui-react";

function App() {
    const [currentUser, setCurrentUser] = useState("")
    const [seen, setSeen] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const history = useHistory();

/////////////////////
// Setup Functions //
/////////////////////

    // forces any refreshing of the app to bring the user back to the home page instead of logging them out. 
    useEffect(() => {
        history.replace('/');
      }, [history]);
    
    const [count, setCount] = useState(0)

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
      initTE({ Datepicker, Input });
    }, []);
        
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

    // Handle User Add & Delete
    function handleAddUser(addUser) {
        const updatedUsers = [...users, addUser]
        setUsers(updatedUsers);
    }

    function handleUserDelete(id) {
        // const updatedUsers = users.filter(user => user.id !== id)
        // setUsers(updatedUsers)   
        setUsers(users =>users.filter(user => user.id !== id))
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
        const updatedItems = [...games, addItem]
        setGames(updatedItems);
    }

    function handleGameDelete(id) {
        const updatedItems = games.filter(game => game.id !== id)
        setGames(updatedItems)
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

    function handleSendMessage(addMessage){
        const updatedMessages = [...messages, addMessage]
        setMessages(updatedMessages)
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
                        <button onClick={togglePop} >"Profile"</button>
                        {seen ? currentUser && users.find((user) => user.id === currentUser.id) && (<UserProfile key={currentUser.id} currentUser={currentUser} setCurrentUser={setCurrentUser} onUserDelete={handleUserDelete} onLogoutClick={handleLogoutClick} onEditProfile={handleEditProfile}/>) : null}                        
                    </div>
                : 
                    <div>
                        <button onClick={togglePop} >"Log In"</button>
                        {seen ? <Login toggle={togglePop} currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} onAddUser={handleAddUser}/> : null}
                    </div>
                }
                </header>
                {currentUser ? <NavBar admin={admin}/> : seen ? null : <h2>Please Log In</h2>}
                {currentUser ? <Switch>
                    <Route exact path="/">
                        <Home currentUser={currentUser}/>
                    </Route>
                    {/* <Route exact path="/messages">
                        <Message currentUser={currentUser}/>
                    </Route> */}
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
                        <GameList games={games} users={users}/>
                    </Route>
                    <Route path="*">
                        <h1>404 not found</h1>
                    </Route>
                </Switch> : null
                }
            </div>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
                </button>
            </div>
            <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput1"
                placeholder="Example label" />
                <label
                htmlFor="exampleFormControlInput1"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Example label
                </label>
            </div>
        </>
    );
}

export default App;