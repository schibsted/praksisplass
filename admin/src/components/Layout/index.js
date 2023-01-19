
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ApplicationList from './ApplicationList';

export default function Layout( props ) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3100/api/applications')
      .then(res => res.json())
      .then(applicants => setApplicants(applicants));
  }, []);

  console.log(props);

  return (
    <div>
        <div id="Nav" />
        <ApplicationList applicants={applicants}/>
        <Outlet />
    </div>
  );
}