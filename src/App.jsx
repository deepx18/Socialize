/** @format */

import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
