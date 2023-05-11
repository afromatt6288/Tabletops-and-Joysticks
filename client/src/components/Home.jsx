import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, Collapse, initTE } from "tw-elements";

function Home({currentUser, theme}) {

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Collapse, Ripple });
    }, []);
//white
    if (currentUser) {
        return (
            <div className="text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] border-[var(--color-theme-border)!important]  hover:border-[var(--color-theme-hover-border)!important] border-4 rounded-lg mx-auto w-3/4">
                <div id="accordionExample" className="">
                    <div className="bg-gray-600 bg-opacity-70 dark:border-neutral-600 dark:bg-neutral-800">
                        <h2 className="accordion-header mb-0" id="headingOne">
                            <button type="button" data-te-collapse-init data-te-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                                className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] group relative flex w-full items-center rounded-lg border-2 px-5 py-4 dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-gray-600:bg-opacity-70  [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`}
                            >
                                <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] flex mx-auto mr-6 font-extrabold border-b-4 border-t-4`}>
                                    Welcome, <strong>{currentUser.username}</strong>, to Tabletops & Joysticks
                                </span>
                                <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </h2>
                        <div id="collapseOne" className="!visible" data-te-collapse-item data-te-collapse-show aria-labelledby="headingOne" data-te-parent="#accordionExample" >
                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-2 rounded-lg px-5 py-4 text-center `} >
                                <h1><strong>Welcome!</strong></h1>
                                <p>There will be plenty more text here to tell you our mission and goals and hopes and dreams.... </p>
                                <p>and all that other B.S. that people say they want to know, but really dont care about as long as your product is useful for them. </p>
                                <p>Hopefully, you are one of those rare exceptions who is truly discerning about what is, and is not, important in this world.</p> 
                                <p>And, as such, I expect that you will see the immense value that is present in this site. And if not... </p>
                                <p><strong>Welcome anyway!</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-600 bg-opacity-70 dark:border-neutral-600 dark:bg-neutral-800">
                        <h2 className="accordion-header mb-0" id="headingTwo">
                            <button type="button" data-te-collapse-init data-te-collapse-collapsed data-te-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                                className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] group relative flex w-full items-center rounded-lg border-2 px-5 py-4 dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-gray-600:bg-opacity-70  [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`}
                            >
                                <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] flex mx-auto mr-6 font-extrabold border-b-4 border-t-4`}>
                                    Community Expectations
                                </span>
                                <span
                                    className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="!visible hidden" data-te-collapse-item aria-labelledby="headingTwo" data-te-parent="#accordionExample">
                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-2 rounded-lg px-5 py-4 text-center `} >
                                <h1><strong>Dont Be a Dick!</strong></h1> 
                                <p>If it sounds easy to you, that is because it is.</p>
                                <p>However, if it sounds difficult for you ... ... ...</p>
                                <p>... ... ...</p>
                                <p>Then here is a wonderful opportunity for you to try something new and expand your skills!</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-600 bg-opacity-70 dark:border-neutral-600 dark:bg-neutral-800">
                        <h2 className="accordion-header mb-0" id="headingThree">
                            <button type="button" data-te-collapse-init data-te-collapse-collapsed data-te-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                            className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] group relative flex w-full items-center rounded-lg border-2 px-5 py-4 dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-gray-600:bg-opacity-70  [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`}
                            >
                                <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] flex mx-auto mr-6 font-extrabold border-b-4 border-t-4`}>
                                    Other Rules and Information
                                </span>
                                <span className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </h2>
                        <div id="collapseThree" className="!visible hidden" data-te-collapse-item aria-labelledby="headingThree" data-te-parent="#accordionExample">
                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-2 rounded-lg px-5 py-4 text-center `} >
                                <h1><strong>Now for the REAL Rules!</strong></h1> 
                                <p>Don't Be a Dick!</p>
                                <p>... ... ...</p>
                                <p>While that is partly meant in jest, there is a touch of seriousness to it.</p>
                                <p>Ultimately this site will become a space where gamers can connect and share what they enjoy.</p>
                                <p>And, as with any social site, the attitudes and conversations will impact them.</p>
                                <p>Please let this be a safe space where anyone can join in and share their love of games without fear of harassment or intentional discomfort.</p>
                                <p>The rest of the rules will e figured out over time.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-600 bg-opacity-70 dark:border-neutral-600 dark:bg-neutral-800">
                        <h2 className="accordion-header mb-0" id="headingFour">
                            <button type="button" data-te-collapse-init data-te-collapse-collapsed data-te-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"
                                className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] group relative flex w-full items-center rounded-lg border-2 px-5 py-4 dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-gray-600:bg-opacity-70  [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`}
                            >
                                <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] flex mx-auto mr-6 font-extrabold border-b-4 border-t-4`}>
                                    Safety Concerns
                                </span>
                                <span className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </h2>
                        <div id="collapseFour" className="!visible hidden" data-te-collapse-item aria-labelledby="headingFour" data-te-parent="#accordionExample">
                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-2 rounded-lg px-5 py-4 text-center `} >
                                <h1><strong>Don't skip this section!!</strong></h1> 
                                <p>Hopefully you never find yourself in harms way from anything related to this site.</p>
                                <p>But, just in case... let's try to limit possibilites.</p>
                                <p>...</p>
                                <p>it is hard to exchange games from a distance, so meeting in person will be likely. Please take the following steps for safety.</p>
                                <p>First of all, consider carefully who you choose to meet in person.</p>
                                <p>Secondly, there is a messaging component on this site. You do not need to give out your phone number, email, or address to someone.</p>
                                <p>To set up a meeting, we recommend that you chose a neutral coffee shop, or other safe location to meet up.</p>
                                <p> Overall, trust your gut. If something feels unsafe, then back away.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-600 bg-opacity-70 dark:border-neutral-600 dark:bg-neutral-800">
                        <h2 className="accordion-header mb-0" id="headingFive">
                            <button type="button" data-te-collapse-init data-te-collapse-collapsed data-te-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"
                                className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] group relative flex w-full items-center rounded-lg border-2 px-5 py-4 dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-gray-600:bg-opacity-70  [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`}
                            >
                                <span className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] ' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] active:border-[var(--color-theme-active-border)!important] flex mx-auto mr-6 font-extrabold border-b-4 border-t-4`}>
                                    Liability Disclaimer
                                </span>
                                <span className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </h2>
                        <div id="collapseFive" className="!visible hidden" data-te-collapse-item aria-labelledby="headingFive" data-te-parent="#accordionExample">
                            <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] text-shadow-[var(--color-theme-text-shadow)!important] hover:text-shadow-[var(--color-theme-hover-text-shadow)!important] '} border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] border-2 rounded-lg px-5 py-4 text-center `} >
                                <strong>Just so we are clear...</strong> 
                                <p>You are in charge of what information you share with others.</p>
                                <p>You are in charge of if you meet with someone.</p>
                                <p>By making choices related to this site, they are YOUR choices.</p>
                                <p>And that is a good thing...</p>
                                <p>You don't need anyone you don't know (like us here at T&J) telling you what to do.</p>
                                <p>So please be responsible for your own decisions, and don't sue us for something stupid you do...</p>
                                <p>Besides which... we are broke. So you would be wasting your time and ours.</p>
                                <p>As they say. You can't squees water from a stone.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Please Login or Sign Up</h1>;
    }
}

export default Home;