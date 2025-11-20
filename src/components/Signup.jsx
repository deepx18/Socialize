/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      alert("Please enter all the informations required ...");
      return;
    }

    await fetch(`http://localhost:8000/users?email=${email}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.length !== 0) {
          alert("This email has already an account ...");
        } else {
          await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Uid: Date.now(),
              email: email,
              password: password,
              display_name: name,
            }),
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                alert("Error accured while registration ");
                navigate("/sign-up");
              }
            })
            .then((data) => {
              console.log(data);
              alert(`Welcome, ${data.display_name} ...`);
              dispatch({ type: "connect_user", payload: data });
              navigate("/");
            });
        }
      });
  };

  return (
    <>
      {/* Sign-Up Form */}
      <div className="sign_form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input
            type="name"
            name="name"
            onChange={(e) => setName(e.target.value.trim())}
            placeholder="John Doe"
          />
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
          <p>
            You already have an account?
            <Link to="/sign-in">Sign-in to you account</Link>
          </p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
