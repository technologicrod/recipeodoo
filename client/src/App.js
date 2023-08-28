import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import Home from "./Home";
import Add from "./Add";
import View from "./View";
import Edit from "./Edit";
import Admindb from "./Admindb";
import Adminview from "./Adminview";
import Adminedit from "./Adminedit";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="App">
        <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/create" element={<Create />} />
        <Route path="/home/:userid" element={<Home />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/add" element={<Add />} />
        <Route path="/view/:recipeid/:userid" element={<View />} />
        <Route path="/edit/:recipeid/:userid" element={<Edit />} />
        <Route path="/admindb/:userid" element={<Admindb />} />
        <Route path="/adminview/:recipeid/:userid" element={<Adminview />} />
        <Route path="/adminedit/:recipeid/:userid" element={<Adminedit />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
