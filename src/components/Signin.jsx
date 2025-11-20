/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          dispatch({ type: "connect_user", payload: data[0] });
          navigate("/");
        } else {
          alert("User email or password incorrect ...");
        }
      });
  };

  return (
    <>
      {/* Sign-In Form */}
      <div className="sign_form">
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
          <p>
            You don't have an account? <Link to="/sign-up">Create account</Link>
          </p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Signin;
