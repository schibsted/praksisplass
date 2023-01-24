
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function Layout( props ) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3100/api/applications')
      .then(res => res.json())
      .then(applicants => setApplicants(applicants));
  }, []);

  return (
    <div>
        <Navigation applicants={applicants}/>
        <Outlet />
    </div>
  );
}