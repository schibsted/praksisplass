import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ApplicationForm from './ApplicationForm';
import ApplicationSent from './ApplicationSent';

function App() {
  return (
  <div className="App">
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route path="/application-is-sent" element={<ApplicationSent />} />
        </Routes> 
    </div>
    
  );
}

export default App;
