/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter all the informations required ...");
      return;
    }

    await fetch(`http://localhost:8000/users?email=${email}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          alert("User email or password incorrect ...");
        }

        if (data[0].password === password) {
          alert(`Welcome back, ${data[0].display_name} ...`);
          navigate("/");
        }
      });
  };

  return (
    <>
      <div className="sign-in_form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="example@email.com"
          />
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
            placeholder="••••••••"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Signin;
