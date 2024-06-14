import React from 'react';

//import Scss
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';
import { Routes } from "react-router-dom";
import "./App.scss"

// Fake Backend 
import fakeBackend from "./helpers/AuthType/fakeBackend";
import { useActivationKey, useCheckActivity } from './utils/auth';

// Activating fake backend
fakeBackend();



function App() {
  useActivationKey()
  useCheckActivity()
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
