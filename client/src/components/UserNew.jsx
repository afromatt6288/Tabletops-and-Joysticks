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
    const [avatar_url, setAvatar_url] = useState("https://cdn-icons-png.flaticon.com/512/8053/8053029.png");
    const [stars, setStars] = useState(3);
    const [travel_distance, setTravel_distance] = useState(5);
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

    console.log(`${username} ${password} ${email} ${address} ${avatar_url} ${stars} ${travel_distance} ${is_active} ${is_admin}`)
    
    function handleSubmit(e) {
        e.preventDefault()
        if (password == passwordConfirmation) {
            const formData = {
                    username: username,
                    password: password,
                    password_confirmation: passwordConfirmation,
                    email: email,
                    address: address,
                    avatar_url: avatar_url,
                    stars: stars,
                    travel_distance: travel_distance,
                    is_active: is_active,
                    is_admin: is_admin
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
                <p> Welcome New User <br/> Create Account Below!</p>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input
                    type={isPasswordSecure? "password" : "text"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <span><input label="show-password" type="checkbox" checked={!isPasswordSecure} onChange={(e)=>setIsPasswordSecure(!isPasswordSecure)}/> {isPasswordSecure ? "🙈" : "🙉"}</span>
                <label htmlFor="password">Password Confirmation: </label>
                <input
                    type={isPasswordConSecure? "password" : "text"}
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="current-password"
                />
                <span><input label="show-password" type="checkbox" checked={!isPasswordConSecure} onChange={(e)=>setIsPasswordConSecure(!isPasswordConSecure)}/> {isPasswordConSecure ? "🙈" : "🙉"}</span>
                {invalidPassword ? <small>Passwords must Match</small> : null}
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="current-email"
                />
                <label htmlFor="address">Address: </label>
                <input
                    type="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    autoComplete="current-address"
                />
                <label htmlFor="avatar_url">Avatar URL: </label>
                <input
                    type="avatar_url"
                    id="avatar_url"
                    value={avatar_url}
                    onChange={(e) => setAvatar_url(e.target.value)}
                    autoComplete="avatar_url"
                />
                <label htmlFor="stars">Stars</label>
                <input
                    type="stars"
                    id="stars"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    autoComplete="stars"
                />
                <label htmlFor="travel_distance">Travel Distance: </label>
                <input
                    type="travel_distance"
                    id="travel_distance"
                    value={travel_distance}
                    onChange={(e) => setTravel_distance(e.target.value)}
                    autoComplete="travel_distance"
                />
                 <button type="submit">Create New Profile</button>
            </form>
                <button onClick={onNewUser}>Returning User? Login!</button>
        </section>
    )
}

export default UserNew