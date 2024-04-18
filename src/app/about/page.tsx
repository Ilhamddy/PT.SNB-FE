import React from "react";
import About from "./component/About";
import Overview from "./component/Overview";
import Contactall from "../components/contactall";
import Profile from "./component/Profile";

const Aboutpage = () => {
  return (
    <main>
      <About />
      <Overview />
      <Profile />
      <Contactall />
    </main>
  )
};

export default Aboutpage;
