import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function UserNew({onNewUser, toggle, theme}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isPasswordConSecure, setIsPasswordConSecure] = useState(true)
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("https://cdn-icons-png.flaticon.com/512/8053/8053029.png");
    const [stars, setStars] = useState(0);
    const [travelDistance, setTravelDistance] = useState(5);
    const [initTheme, setInitTheme] = useState("blue")
    const [is_active, setIs_active] = useState(false);
    const [is_admin, setIs_admin] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false)

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    const themeList = ["purple", "orange", "blue", "green", "multi"]

    console.log(`${username} ${password} ${email} ${address} ${avatarUrl} ${stars} ${travelDistance} ${is_active} ${is_admin}`)
    
    function handleSubmit(e) {
        e.preventDefault()
        if (password == passwordConfirmation) {
            const formData = {
                username: username,
                password: password,
                password_confirmation: passwordConfirmation,
                email: email,
                address: address,
                avatar_url: avatarUrl,
                stars: stars,
                travel_distance: travelDistance,
                is_active: is_active,
                is_admin: is_admin,
                theme: initTheme
            }
            fetch("api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(r => {
                    if (r.ok) {
                        r.json()
                        .then(user => {
                            onNewUser(user)
                            history.push(`/`)
                    })}
                toggle()
                })
        } else {
            setInvalidPassword(e=>setInvalidPassword(!invalidPassword))
        }
    }

    return (
        <section id="signup-form">
            <form onSubmit={handleSubmit}>
                <p className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } mb-4`}
                    >Welcome New User! |  Create Account Below!
                </p>
                <div className="flex justify-between">
                    {/* <!--Username input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init style={{ flex: "7" }}>
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text"
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                        />
                        <label 
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                        >Username</label>
                    </div>
                    {/* <!--Theme input--> */}
                    <div className="relative mb-3" style={{ flex: "3" }}>
                        <select value={initTheme} onChange={(e) => setInitTheme(e.target.value)} data-te-select-init className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] ' }`}>
                            {themeList.map((initTheme)=> <option value={initTheme} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
                                >{initTheme}
                            </option>)}
                        </select>
                        <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}
                            >Theme
                        </label>
                    </div>
                </div>
                <div className="flex justify-between">
                    {/* <!--Password input--> */}
                    <div className="relative mb-4 flex justify-between" data-te-input-wrapper-init>
                        <input value={password} onChange={e => setPassword(e.target.value)} type={isPasswordSecure? "password" : "text"}
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                            />
                            <button type="button" onClick={(e)=>setIsPasswordSecure(!isPasswordSecure)} style={{ fontSize: 'max(1.5vw, 1em)'}}> {isPasswordSecure ? "🙈" : "🙉"}</button>
                        <label
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                            >Password
                        </label>
                    </div>
                    {/* <!--Password Confirmaton input--> */}
                    <div className="relative mb-4 flex justify-between" data-te-input-wrapper-init>
                        <input value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} type={isPasswordConSecure? "password" : "text"}
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                            />
                            <button type="button" onClick={(e)=>setIsPasswordConSecure(!isPasswordConSecure)} style={{ fontSize: 'max(1.5vw, 1em)'}}> {isPasswordConSecure ? "🙈" : "🙉"}</button>
                        <label
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                            >Password Confirmation
                        </label>
                    </div>
                </div>
                {invalidPassword ? <small>Passwords must Match</small> : <small>-</small>}
                <div className="flex justify-between">
                    {/* <!--Email input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                        />
                        <label 
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                            >Email
                        </label>
                    </div>
                    {/* <!--Address input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init>
                        <input value={address} onChange={e => setAddress(e.target.value)} type="address"
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                        />
                        <label 
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                            >Address
                        </label>
                    </div>
                </div>
                <div className="flex justify-between">
                    {/* <!--Avatar Url input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init style={{ flex: "7" }}>
                        <input value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} type="text"
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                        />
                        <label 
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                            >Avatar Url
                        </label>
                    </div>
                    {/* <!--Travel Distance input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init style={{ flex: "3" }}>
                        <input value={travelDistance} onChange={e => setTravelDistance(e.target.value)} type="number"
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                        />
                        <label 
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
                            >Travel Distance
                        </label>
                    </div>
                </div>
                {/* <!--Submit button--> */}
                <div className="mb-12 pb-1 pt-1 text-center">
                    <button type="submit" data-te-ripple-init data-te-ripple-color="light"
                        // style={{ background: "linear-gradient(to right, #d70ad3, #d00dd6, #c910d9, #bc14da, #b019db, #a41edc, #9823dd, #8c28de, #7f32df, #6b3fd9, #5346d9, #3d50d6, #2b59d1)" }}
                        className={`bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"`}
                    > 
                    <span style={{ fontSize: 'max(1.2vw, 1em)'}}
                        className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}>
                    Create New Profile</span>
                    </button>
                    {/* <!--Returning User button--> */}
                    <div>
                        <button onClick={onNewUser} type="button" data-te-ripple-init data-te-ripple-color="light"
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important]' : 'text-[var(--color-theme-text)!important] border-[var(--color-theme-border)!important] hover:text-[var(--color-theme-hover-text)!important] hover:border-[var(--color-theme-hover-border)!important]'} inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`}
                        > Returning User? Login Here!
                        </button>
                    </div>
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
        </section>
    )
}

export default UserNew