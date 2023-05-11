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

    if (currentUser) {
        return (
            <div className="text-[var(--color-theme-text)!important] border-[var(--color-theme-border)!important] hover:text-[var(--color-theme-hover-text)!important] hover:border-[var(--color-theme-hover-border)!important] mx-auto w-3/4">
                <div id="accordionExample" className="">
                        <div class="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                            <h2 class="mb-0" id="headingOne">
                                <button
                                    class="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                    type="button"
                                    data-te-collapse-init
                                    data-te-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne">
                                    Welcome, {currentUser.username}, to Tabletops & Joysticks
                                    <span
                                        class="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="h-6 w-6">
                                            <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </button>
                            </h2>
                            <div
                            id="collapseOne"
                            class="!visible"
                            data-te-collapse-item
                            data-te-collapse-show
                            aria-labelledby="headingOne"
                            data-te-parent="#accordionExample">
                            <div class="px-5 py-4">
                                <strong>This is the first item's accordion body.</strong> It is
                                shown by default, until the collapse plugin adds the appropriate
                                classes that we use to style each element. These classes control
                                the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or
                                overriding our default variables. It's also worth noting that just
                                about any HTML can go within the <code>.accordion-body</code>,
                                though the transition does limit overflow.
                            </div>
                            </div>
                        </div>
                        <div
                            class="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                            <h2 class="mb-0" id="headingTwo">
                            <button
                                class="group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                type="button"
                                data-te-collapse-init
                                data-te-collapse-collapsed
                                data-te-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo">
                                Community Expectations
                                <span
                                class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-6 w-6">
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapseTwo"
                            class="!visible hidden"
                            data-te-collapse-item
                            aria-labelledby="headingTwo"
                            data-te-parent="#accordionExample">
                            <div class="px-5 py-4">
                                <strong>This is the second item's accordion body.</strong> It is
                                hidden by default, until the collapse plugin adds the appropriate
                                classes that we use to style each element. These classes control
                                the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or
                                overriding our default variables. It's also worth noting that just
                                about any HTML can go within the <code>.accordion-body</code>,
                                though the transition does limit overflow.
                            </div>
                            </div>
                        </div>
                        <div
                            class="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                            <h2 class="accordion-header mb-0" id="headingThree">
                            <button
                                class="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                                type="button"
                                data-te-collapse-init
                                data-te-collapse-collapsed
                                data-te-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree">
                                Other Rules and Information
                                <span
                                class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-6 w-6">
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapseThree"
                            class="!visible hidden"
                            data-te-collapse-item
                            aria-labelledby="headingThree"
                            data-te-parent="#accordionExample">
                            <div class="px-5 py-4">
                                <strong>This is the third item's accordion body.</strong> It is
                                hidden by default, until the collapse plugin adds the appropriate
                                classes that we use to style each element. These classes control
                                the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or
                                overriding our default variables. It's also worth noting that just
                                about any HTML can go within the <code>.accordion-body</code>,
                                though the transition does limit overflow.
                            </div>
                            </div>
                        </div>
                        <div
                            class="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                            <h2 class="accordion-header mb-0" id="headingFour">
                            <button
                                class="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                                type="button"
                                data-te-collapse-init
                                data-te-collapse-collapsed
                                data-te-target="#collapseFour"
                                aria-expanded="false"
                                aria-controls="collapseFour">
                                Safety Concerns
                                <span
                                class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-6 w-6">
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapseFour"
                            class="!visible hidden"
                            data-te-collapse-item
                            aria-labelledby="headingFour"
                            data-te-parent="#accordionExample">
                            <div class="px-5 py-4">
                                <strong>This is the third item's accordion body.</strong> It is
                                hidden by default, until the collapse plugin adds the appropriate
                                classes that we use to style each element. These classes control
                                the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or
                                overriding our default variables. It's also worth noting that just
                                about any HTML can go within the <code>.accordion-body</code>,
                                though the transition does limit overflow.
                            </div>
                            </div>
                        </div>
                        <div
                            class="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                            <h2 class="accordion-header mb-0" id="headingFive">
                            <button
                                class="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                                type="button"
                                data-te-collapse-init
                                data-te-collapse-collapsed
                                data-te-target="#collapseFive"
                                aria-expanded="false"
                                aria-controls="collapseFive">
                                Liability Disclaimer
                                <span
                                class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-6 w-6">
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapseFive"
                            class="!visible hidden"
                            data-te-collapse-item
                            aria-labelledby="headingFive"
                            data-te-parent="#accordionExample">
                            <div class="px-5 py-4">
                                <strong>This is the third item's accordion body.</strong> It is
                                hidden by default, until the collapse plugin adds the appropriate
                                classes that we use to style each element. These classes control
                                the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or
                                overriding our default variables. It's also worth noting that just
                                about any HTML can go within the <code>.accordion-body</code>,
                                though the transition does limit overflow.
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