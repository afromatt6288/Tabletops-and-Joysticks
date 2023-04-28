import React from "react";

function Home({currentUser}) {
    if (currentUser) {
        return (
            <section id="home">
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