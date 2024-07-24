import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {NextUIProvider} from "@nextui-org/react";
import './App.css';
import Home from './pages/Home';

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
       <NextUIProvider navigate={navigate}>
      {/* Your app here... */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ... */}
      </Routes>
    </NextUIProvider>
    </div>
  );
}

export default App;
