import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function UserPasswordReset() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TBD
    history.push("/login");
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default UserPasswordReset;