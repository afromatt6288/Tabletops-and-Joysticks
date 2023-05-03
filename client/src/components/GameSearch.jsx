import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function GameSearch({search, onSearchChange, sortBy, onSortChange, onHandleTypeFilter, onHandleGenreFilter, onHandlePlatformFilter,filterByType, filterByGenre, filterByPlatform, types, genres, platforms}) {
  
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
    <div>
      <label>Sort By:          
        <input
          type="radio"
          value="Alphabetical"
          name="sort"
          checked={sortBy === "Alphabetical"}
          onChange={handleSortChange}
        />
          Alphabetical | 
        <input
          type="radio"
          value="ID"
          name="sort"
          checked={sortBy === "ID"}
          onChange={handleSortChange}
        />
        ID |  
        <input
          type="radio"
          value="Maximum Number of Players"
          name="sort"
          checked={sortBy === "Maximum Number of Players"}
          onChange={handleSortChange}
        />
        Max Number of Players | 
      </label>
      <label>
        <strong>Filter by Type:</strong>
        <select onChange={handleTypeFilter} value={filterByType}>
          <option value="All">All</option>
          {types.map((type)=> <option value={type} key = {(type)}>{type}</option>)}
        </select>
       | </label>
      <label>
        <strong>Filter by Genre:</strong>
        <select onChange={handleGenreFilter} value={filterByGenre}>
          <option value="All">All</option>
          {genres.map((genre)=> <option value={genre} key = {(genre)}>{genre}</option>)}
        </select>
       | </label>
      <label>
        <strong>Filter by Platform:</strong>
        <select onChange={handlePlatformFilter} value={filterByPlatform}>
          <option value="All">All</option>
          {platforms.map((platform)=> <option value={platform} key = {(platform)}>{platform}</option>)}
        </select>
       | </label>
      <div>
        <input type="text" name="search" placeholder="Search..." value={search} onChange={e=> onSearchChange(e.target.value)}/>
        <i/>
      </div>
    </div>
  );
}

export default GameSearch;