import React from 'react';
import { Provider } from 'react-redux';
//imoprt Route
import AppRoutes from './AppRoutes';
import { Routes } from "react-router-dom";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import './assets/app.scss'

function App() {
  return (
    <React.Fragment>
      <AppRoutes />
    </React.Fragment>
  );
}

export default App;

