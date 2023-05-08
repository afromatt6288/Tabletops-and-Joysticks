import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function UserNew({onNewUser, toggle}) {
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
    const [theme, setTheme] = useState("purple")
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
                theme: theme
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
                <p className="mb-4">Welcome New User! |  Create Account Below!</p>
                <div className="flex justify-between">
                    {/* <!--Username input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init style={{ flex: "7" }}>
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        />
                        <label 
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Username</label>
                    </div>
                    {/* <!--Theme input--> */}
                    <div className="relative mb-3" style={{ flex: "3" }}>
                        <select value={theme} onChange={(e) => setTheme(e.target.value)} data-te-select-init>
                            {themeList.map((theme)=> <option value={theme}>{theme}</option>)}
                        </select>
                        <label data-te-select-label-ref className="text-purple-400" >Theme</label>
                    </div>
                </div>
                <div className="flex justify-between">
                    {/* <!--Password input--> */}
                    <div className="relative mb-4 flex justify-between" data-te-input-wrapper-init>
                        <input value={password} onChange={e => setPassword(e.target.value)} type={isPasswordSecure? "password" : "text"}
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            />
                            <button type="button" onClick={(e)=>setIsPasswordSecure(!isPasswordSecure)}> {isPasswordSecure ? "🙈" : "🙉"}</button>
                        <label
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Password
                        </label>
                    </div>
                    {/* <!--Password Confirmaton input--> */}
                    <div className="relative mb-4 flex justify-between" data-te-input-wrapper-init>
                        <input value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} type={isPasswordConSecure? "password" : "text"}
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            />
                            <button type="button" onClick={(e)=>setIsPasswordConSecure(!isPasswordConSecure)}> {isPasswordConSecure ? "🙈" : "🙉"}</button>
                        <label
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Password Confirmation
                        </label>
                    </div>
                </div>
                {invalidPassword ? <small>Passwords must Match</small> : <small>-</small>}
                <div className="flex justify-between">
                    {/* <!--Email input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        />
                        <label 
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Email
                        </label>
                    </div>
                    {/* <!--Address input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init>
                        <input value={address} onChange={e => setAddress(e.target.value)} type="address"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        />
                        <label 
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Address
                        </label>
                    </div>
                </div>
                <div className="flex justify-between">
                    {/* <!--Avatar Url input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init style={{ flex: "7" }}>
                        <input value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        />
                        <label 
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Avatar Url
                        </label>
                    </div>
                    {/* <!--Travel Distance input--> */}
                    <div className="relative mb-4" data-te-input-wrapper-init style={{ flex: "3" }}>
                        <input value={travelDistance} onChange={e => setTravelDistance(e.target.value)} type="number"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        />
                        <label 
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-purple-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Travel Distance
                        </label>
                    </div>
                </div>
                {/* <!--Submit button--> */}
                <div className="mb-12 pb-1 pt-1 text-center">
                    <button type="submit" data-te-ripple-init data-te-ripple-color="light"
                        style={{ background: "linear-gradient(to right, #d70ad3, #d00dd6, #c910d9, #bc14da, #b019db, #a41edc, #9823dd, #8c28de, #7f32df, #6b3fd9, #5346d9, #3d50d6, #2b59d1)" }}
                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    > Create New Profile
                    </button>
                    {/* <!--Returning User button--> */}
                    <div>
                        <button onClick={onNewUser} type="button" data-te-ripple-init data-te-ripple-color="light"
                            className="inline-block rounded border-2 border-purple-400 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-purple-400 transition duration-150 ease-in-out hover:border-purple-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-purple-800 focus:border-purple-600 focus:text-purple-600 focus:outline-none focus:ring-0 active:border-purple-700 active:text-purple-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        > Returning User? Login Here!
                        </button>
                    </div>
                    <br/>
                    {/* <!-- Bottom Row container with background and description--> */}
                    <div
                        className="items-center rounded-lg lg:w-full "
                        style={{ background: "linear-gradient(to right, #d70ad3, #d00dd6, #c910d9, #bc14da, #b019db, #a41edc, #9823dd, #8c28de, #7f32df, #6b3fd9, #5346d9, #3d50d6, #2b59d1)", marginBottom: "-12vh"  }}
                    >
                        <div className="px-12 py-0 text-white ">
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