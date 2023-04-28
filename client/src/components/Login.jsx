import React, {useState} from "react";
import { useHistory, Link } from "react-router-dom"
import UserNew from "./UserNew"
import UserCard from "./UserCard"

function Login ({currentUser, setCurrentUser, toggle, users, onAddUser, onUserDelete}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [invalidUser, setInvalidUser] = useState(false)
    const [newUser, setNewUser] = useState(false)
    
    const history = useHistory()

    const currentUserCard =
    currentUser &&
    users.find((user) => user.id === currentUser.id) && (
      <UserCard
        key={currentUser.id}
        user={currentUser}
        onUserDelete={onUserDelete}
      />
    );
 
    function handleSubmit(e) {
        e.preventDefault();
        <Link to={`/`}></Link>
        fetch("api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              setCurrentUser(user)
            })
            history.push(`/`)
            toggle()
          } else { 
            setInvalidUser(e=>setInvalidUser(!invalidUser))
          }});
        }
        
        function handleNewUser(addUser){
          onAddUser(addUser)
          setNewUser(!newUser)
        }
        
      function handleLogoutClick() {
        <Link to={`/`}></Link>
        fetch("api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setCurrentUser(null);
          }
        });
      }

    return (
        <div>
          <div>
            {currentUser ? 
              <div>
                <section id="profile">
                  {currentUserCard}
                </section>
              </div>
              : newUser ? <UserNew onNewUser={handleNewUser} toggle={toggle} /> :
                <form onSubmit={handleSubmit}>
                    <input type="text" id="username" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value) }/>
                    <input type={isPasswordSecure? "password" : "text"} id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <span><input label="show-password" type="checkbox" checked={!isPasswordSecure} onChange={(e)=>setIsPasswordSecure(!isPasswordSecure)}/> Show</span>
                    <br/>
                    <button type="submit">Login</button>
                    <br/>
                    {invalidUser ? <small>Invalid User</small> : null}
                    <button onClick={e=>setNewUser(!newUser)}>New User? Sign up here!</button> 
                </form>}
                {currentUser ? 
                  <div>
                    <button onClick={handleLogoutClick}>Log Out</button>
                    <span>_</span>
                  </div>
                : null}
            </div>
        </div>
    );
 }

export default Login