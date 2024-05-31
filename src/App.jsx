import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";

function App() {
  const {tg, user, onToggleButton} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);
  
  console.log("user", user);  

  const onClose = () => {
    tg.close();
  }

  return (
      <div className="App">
          <h1>Food Ordering Miniapp</h1>
          <h2>Menu1</h2>
          <button onClick={onClose}>Close</button>
          <button onClick={onToggleButton}>toggle</button>
      </div>
  );
}

export default App;
