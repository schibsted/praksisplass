
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import ApplicationList from './ApplicationList';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { applicants } from '../../atoms'
import './index.css'

export default function Layout( props ) {
  const applicantsState = useRecoilValue(applicants)
  const updateApplicants = useSetRecoilState(applicants);

  useEffect(() => {
    fetch('http://localhost:3100/api/applications')
      .then(res => res.json())
      .then(applicants => {
        if (applicants) {
          updateApplicants(applicants)
        }
      });
  }, []);

  return (
    <div className='container'>
        <Navigation className="Nav"  applicants={applicantsState} />
        <ApplicationList className="ApplicationList"applicants={applicantsState} />
        <Outlet className="Applicant"/>
    </div>
  );
}