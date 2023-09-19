import React from 'react';

//import Scss
import './assets/scss/themes.scss';

//imoprt Route
import AppRoutes from './AppRoutes';
import { Routes } from "react-router-dom";
import "./App.scss"

// Fake Backend 
import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();


function App() {
  return (
    <React.Fragment>
      <AppRoutes />
    </React.Fragment>
  );
}

export default App;

