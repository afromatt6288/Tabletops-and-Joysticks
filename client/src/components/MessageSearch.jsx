import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function MessageSearch({ search, onSearchChange }) {

/////////////////////
// Setup Functions //
/////////////////////

    const history = useHistory()

    // This is what implements Tailwind... so DON'T delete it. 
    useEffect(() => {
        initTE({ Datepicker, Input, Select, Ripple });
    }, []);

  return (
    <nav>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
    </nav>
  );
}

export default MessageSearch;