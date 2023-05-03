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
        <section>
            <div>
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
            <div>
                <input type="text" name="search" placeholder="🔍 Search..." value={search} onChange={e=> onSearchChange(e.target.value)}/>
                {/* <i>🔍</i> */}
            </div>          
            </div>
        </section>
    );
}

export default UserSearch;