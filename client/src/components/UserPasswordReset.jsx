import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Datepicker, Input, Ripple, Select, initTE } from "tw-elements";

function UserPasswordReset() {
  const [email, setEmail] = useState("");

/////////////////////
// Setup Functions //
/////////////////////

  const history = useHistory();

  // This is what implements Tailwind... so DON'T delete it. 
  useEffect(() => {
    initTE({ Datepicker, Input, Select, Ripple });
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // TBD
    history.push("/login");
  };

  return (
    <div className="text-white flex text-center">
      <form onSubmit={handleSubmit} className="mt-4 ml-4">
        <h1 className="mb-4">Reset Password</h1>
        <div className="relative mb-4"data-te-input-wrapper-init>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label 
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >Email
          </label>
        </div>
        <button type="submit" data-te-ripple-init data-te-ripple-color="light"
          style={{ background: "linear-gradient(to right, #d70ad3, #d00dd6, #c910d9, #bc14da, #b019db, #a41edc, #9823dd, #8c28de, #7f32df, #6b3fd9, #5346d9, #3d50d6, #2b59d1)" }}
          className="hover:text-[var(--color-theme-hover-text)!important] mt-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
        > Reset Password
        </button>
      </form>
    </div>
  );
}

export default UserPasswordReset;