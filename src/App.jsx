/** @format */

import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Signin from "./components/Signin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        {/* <Route path="/" element={<Home />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
