import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function UserSearch({search, onSearchChange, sortBy, onSortChange, onHandleGameTypeFilter, filterByGameType, types}) {

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
    function handleGameTypeFilter(e){
        onHandleGameTypeFilter(e.target.value)
    }
  
    return (
        <div className="relative h-full border-2 rounded-lg border-purple-500">
            <label>Sort By :         
                <input
                    type="radio"
                    value="Alphabetical"
                    name="sort"
                    checked={sortBy === "Alphabetical"}
                    onChange={handleSortChange}
                />
                Alphabetical
                <input
                    type="radio"
                    value="ID Number"
                    name="sort"
                    checked={sortBy === "ID Number"}
                    onChange={handleSortChange}
                />
                ID Number
            </label>
            <label>
                <strong> Filter by Game Type:</strong>
                <select onChange={handleGameTypeFilter} value={filterByGameType}>
                    <option value="All">All</option>
                    {types.map((type)=> <option key={type} value={type}>{type}</option>)}
                </select>
            </label>
            <div class="relative mb-3" data-te-input-wrapper-init>
                <input type="search" value={search} onChange={e=> onSearchChange(e.target.value)}
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                />
                <label
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Search ...</label>
            </div>          
        </div>
    );
}

export default UserSearch;