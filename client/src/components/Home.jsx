import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function Home({currentUser, theme}) {

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

    if (currentUser) {
        return (
            <section id="home" className="text-white">
                <h1 >
                    Welcome, {currentUser.username}, to Tabletops & Joysticks</h1>

                <div>
                    <h3>
                        A Bunch of Text
                        <br/>
                        A Welcome Message
                        <br/>
                        Community Expectations
                        <br/>
                        Other Rules and Information
                        <br/>
                        Safety Concerns
                        <br/> 
                        Liability Disclaimer
                    </h3>
                </div>
            </section>
        );
    } else {
        return <h1>Please Login or Sign Up</h1>;
    }
}

export default Home;