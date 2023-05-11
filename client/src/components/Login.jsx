import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";
import UserNew from "./UserNew";

function Login ({currentUser, setCurrentUser, toggle, theme, users, onAddUser}) {
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
      
  function handleAddUser(addUser){
    onAddUser(addUser)
  }
  function handleNewUser(){
    setNewUser(!newUser)
  }
      
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="absolute inset-x-[30%] bottom-5 top-5 text-center md:block space-y-4 md:space-y-6 lg:space-y-8">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-linear-gradient(to right, #d70ad3, #d00dd6, #c910d9, #bc14da, #b019db, #a41edc, #9823dd, #8c28de, #7f32df, #6b3fd9, #5346d9, #3d50d6, #2b59d1 dark:text-neutral-200 mx-auto max-w-[40rem]">
          <div className="text-[var(--color-theme-text)!important] border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-4 block rounded-lg bg-gray-600 bg-opacity-60 shadow-lg dark:bg-neutral-800 w-full md:w-auto">
            <div>
              {/* <!-- Top Row container--> */}
                <div className="md:mx-2 md:p-12">
                  {/* <!--Logo--> */}
                  <div className="text-center">
                    <button onClick={toggle}>
                      <img
                        className="mx-auto w-48 "
                        src="Tabletops & Joysticks Logo trans.png"
                        alt="Tabletops & Joysticks Logo" 
                      />
                    </button>                  
                    <h4 className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } mt-1 my-2 pb-1 text-2xl font-semibold `}>Tabletops & Joysticks</h4>
                  </div>
                  {newUser ? ( <UserNew onNewUser={handleNewUser} onAddUser={handleAddUser} toggle={toggle} theme={theme} /> 
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <p className={`mb-4 ${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]'}`}>Please login to your account</p>
                      {/* <!--Username input--> */}
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text"
                          className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                        />
                        <label 
                          className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                          >Username
                        </label>
                      </div>
                      {/* <!--Password input--> */}
                      <div className="relative mb-4 flex justify-between" data-te-input-wrapper-init>
                        <input value={password} onChange={e => setPassword(e.target.value)} type={isPasswordSecure? "password" : "text"}
                          className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                        />
                        <button type="button" onClick={(e)=>setIsPasswordSecure(!isPasswordSecure)} style={{ fontSize: 'max(1.5vw, 1em)'}}> {isPasswordSecure ? "🙈" : "🙉"}</button>
                        <label
                          className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                          >Password
                        </label>
                      </div>
                      {/* <!--Submit button--> */}
                      {invalidUser ? <small className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' }`}>Invalid User</small> : <small className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' }`}>Welcome</small>}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button type="submit" data-te-ripple-init data-te-ripple-color="light"
                          // style={{ background: "linear-gradient(to right, #d70ad3, #d00dd6, #c910d9, #bc14da, #b019db, #a41edc, #9823dd, #8c28de, #7f32df, #6b3fd9, #5346d9, #3d50d6, #2b59d1)"}}
                          className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"`}
                        > 
                          <span style={{ fontSize: 'max(1.3vw, 1em)'}}
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' }`}
                          >Log in</span>
                        </button>
                        {/* <!--Register button--> */}
                        <div>
                          <button onClick={e=>setNewUser(!newUser)} type="button" data-te-ripple-init data-te-ripple-color="light"
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] border-[var(--color-theme-border)!important] hover:text-[var(--color-theme-hover-text)!important] hover:border-[var(--color-theme-hover-border)!important]'} inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`}
                          >New User? Sign up here!
                          </button>
                        </div>
                          {/* <!--Forgot password link--> */}
                          <Link className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]'}`} to="/reset-password">Forgot your password?</Link>
                          <br/>
                        {/* <!-- Bottom Row container with background and description--> */}
                        <div
                          className="items-center rounded-lg lg:w-full "
                          style={{ background: "linear-gradient(to right, #d70ad3, #d00dd6, #c910d9, #bc14da, #b019db, #a41edc, #9823dd, #8c28de, #7f32df, #6b3fd9, #5346d9, #3d50d6, #2b59d1)", marginBottom: "-12vh"  }}
                        >
                          <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' } px-12 py-0 `}>
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