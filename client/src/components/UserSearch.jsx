import React from "react";

function UserSearch({search, onSearchChange, onHandleGameTypeFilter, filterByGameType, types}) {

  function handleGameTypeFilter(e){
    onHandleGameTypeFilter(e.target.value)
  }
  
  return (
    <section>
        <div>
            <label>
                <strong> Filter by Game Type:</strong>
                <select onChange={handleGameTypeFilter} value={filterByGameType}>
                    <option value="All">All</option>
                    {types.map((type)=> <option key={type} value={type}>{type}</option>)}
                </select>
            </label>
          <div>
            <input type="text" name="search" placeholder="Search..." value={search} onChange={e=> onSearchChange(e.target.value)}/>
            <i/>
          </div>          
        </div>
    </section>
  );
}

export default UserSearch;