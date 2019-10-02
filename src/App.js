import React from 'react';
import logo from './logo.svg';
import './App.css';
import Portfolio from './components/Portfolio'
import Login from "./components/Login"
import Login from "./components/Signup"


function App() {
  return (
    <div className="App">
      <Login/>
      <Portfolio />
      <Signup />
    </div>
  );
}

export default App;
