import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {NextUIProvider} from "@nextui-org/react";
import './App.css';
import Home from './pages/Home';
import User from './pages/User';
import Admin from './pages/Admin';

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
       <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pages/User" element={<User />} />
        <Route path="pages/Admin" element={<Admin />} />
      </Routes>
    </NextUIProvider>
    </div>
  );
}

export default App;
