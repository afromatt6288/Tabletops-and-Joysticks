import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function GameSearch({search, onSearchChange, sortBy, onSortChange, onHandleTypeFilter, onHandleGenreFilter, onHandlePlatformFilter,filterByType, filterByGenre, filterByPlatform, types, genres, platforms, theme}) {
  
/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory()

  // This is what implements Tailwind... so DON'T delete it. 
  useEffect(() => {
    initTE({ Datepicker, Input, Select, Ripple });
  }, []);

  function handleSortChange(e){
    onSortChange(e.target.value)
  }

  function handleTypeFilter(e){
    onHandleTypeFilter(e.target.value)
  }

  function handleGenreFilter(e){
    onHandleGenreFilter(e.target.value)
  }

  function handlePlatformFilter(e){
    onHandlePlatformFilter(e.target.value)
  }

  return (
    <div className={` border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] relative h-full border-2 rounded-lg`}>
      <div className="flex justify-between my-4 w-5/6">
      {/* Filters */}
        {/* Type */}
        <div className="relative">
          <select onChange={handleTypeFilter} value={filterByType} data-te-select-init className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] ' }`}>
            <option value="All" className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`} 
              >All
            </option>
            {types.map((type)=> <option value={type} key={(type)} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
              >{type}
            </option>)}
          </select>
          <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}
            >Filter by Type
          </label>
        </div>
        {/* Genre */}
        <div className="relative">
          <select onChange={handleGenreFilter} value={filterByGenre} data-te-select-init className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] ' }`}>
            <option value="All" className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
              >All
            </option>
            {genres.map((genre)=> <option value={genre} key={(genre)} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
              >{genre}
            </option>)}
          </select>
          <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}
            >Filter by Genre
          </label>
        </div>
        {/* Platform */}
        <div className=" relative" >
          <select onChange={handlePlatformFilter} value={filterByPlatform} data-te-select-init className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] ' }`}>
            <option value="All" className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
              >All
            </option>
            {platforms.map((platform)=> <option value={platform} key={(platform)} className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] bg-theme-gradient hover:bg-theme-gradient-hover active:bg-theme-gradient-active' }`}
              >{platform}
            </option>)}
          </select>
          <label data-te-select-label-ref className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' }`}
            >Filter by Platform
          </label>
        </div>
      </div>
      <div className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active ' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } border-[var(--color-theme-border)!important] hover:border-[var(--color-theme-hover-border)!important] relative h-full border-2 mt-2rounded-lg`}>
        <div className="flex justify-between w-5/6 mt-2">      
            <div className=" mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
              <input type="radio" value="Alphabetical" checked={sortBy === "Alphabetical"} onChange={handleSortChange}
                className="relative float-left -ml-[1.5rem] mr-2 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"/>
              <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } mt-px inline-block pl-[0.15rem] hover:cursor-pointer`}
                > Alphabetical 
              </label>
            </div>
            <div className=" mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
              <input type="radio" value="ID" checked={sortBy === "ID"} onChange={handleSortChange}
                className="relative float-left -ml-[1.5rem] mr-2 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"/>
              <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } mt-px inline-block pl-[0.15rem] hover:cursor-pointer`}
                > ID 
              </label>
            </div>
            <div className=" mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
              <input type="radio" value="Maximum Number of Players" checked={sortBy === "Maximum Number of Players"} onChange={handleSortChange}
                className="relative float-left -ml-[1.5rem] mr-2 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"/>
              <label className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important] ' } mt-px inline-block pl-[0.15rem] hover:cursor-pointer`}
                > Max # of Players 
              </label>
            </div>
            
          <div className="relative mb-2" data-te-input-wrapper-init>
            <input type="search" value={search} onChange={e=> onSearchChange(e.target.value)}
              className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important]' } peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
            />
            <label
              className={`${theme === 'multi' ? 'text-multi bg-multi-gradient hover:bg-multi-gradient-hover active:bg-multi-gradient-active' : 'text-[var(--color-theme-text)!important] hover:text-[var(--color-theme-hover-text)!important]' } pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}
              >Search ...
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSearch;