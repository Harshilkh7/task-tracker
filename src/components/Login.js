import React, { useState } from "react";

function Login({ onLogin }) {
  const [inputUser, setInputUser] = useState("");

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={inputUser}
        onChange={(e) => setInputUser(e.target.value)}
      />
      <button onClick={() => onLogin(inputUser)}>Login</button>
    </div>
  );
}

export default Login;
