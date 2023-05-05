import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import UserNew from "./UserNew";

function Login ({currentUser, setCurrentUser, toggle, users, onAddUser}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [invalidUser, setInvalidUser] = useState(false)
  const [newUser, setNewUser] = useState(false)
    
/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory()

  // This is what implements Tailwind... so DON'T delete it. 
  useEffect(() => {
    initTE({ Datepicker, Input, Select, Ripple });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    <Link to={`/`}></Link>
    fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
          r.json()
          .then((user) => {
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
      
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="absolute inset-x-[30%] bottom-5 top-5 text-center text-white md:block space-y-4 md:space-y-6 lg:space-y-8">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-purple-600 dark:text-neutral-200 mx-auto max-w-[40rem]">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800 w-full md:w-auto">
            <div>
              {/* <!-- Top Row container--> */}
                <div className="md:mx-2 md:p-12">
                  {/* <!--Logo--> */}
                  <div className="text-center">
                    <button onClick={toggle}>
                      <img
                        className="mx-auto w-48"
                        src="Tabletops & Joysticks Logo trans.png"
                        alt="Tabletops & Joysticks Logo" 
                      />
                    </button>                  
                    <h4 className="mt-1 my-2 pb-1 text-2xl font-semibold">Tabletops & Joysticks</h4>
                  </div>
                  {newUser ? ( <UserNew onNewUser={handleNewUser} toggle={toggle} /> 
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">Please login to your account</p>

                      {/* <!--Username input--> */}
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        />
                        <label 
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >Username
                        </label>
                      </div>

                      {/* <!--Password input--> */}
                      <div className="relative mb-4 flex justify-between" data-te-input-wrapper-init>
                        <input value={password} onChange={e => setPassword(e.target.value)} type={isPasswordSecure? "password" : "text"}
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          />
                          <button type="button" onClick={(e)=>setIsPasswordSecure(!isPasswordSecure)}> {isPasswordSecure ? "🙈" : "🙉"}</button>
                        <label
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >Password
                        </label>
                      </div>
                  

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button type="submit" data-te-ripple-init data-te-ripple-color="light"
                          style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        > Log in
                        </button>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between">
                        <p className="mb-0 mr-2">New User? 👉 </p>
                        <button onClick={e=>setNewUser(!newUser)} type="button" data-te-ripple-init data-te-ripple-color="light"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        > Sign up here!
                        </button>
                      </div>
                        {/* <!--Forgot password link--> */}
                        <a href="#!">Forgot password?</a>
                        <br/>
                        {invalidUser ? <small>Invalid User</small> : null}
              {/* <!-- Bottom Row container with background and description--> */}
              <div
                className="items-center rounded-lg lg:w-full "
                style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)", marginBottom: "-12vh"  }}
              >
                <div className="px-12 py-0 text-white ">
                  <h4 className="mb-6 text-xl font-semibold">
                    Sharing the Games we Love, with a Community that Appreciates them!
                  </h4>
                </div>
              </div>
                      </div>

                    </form>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login