import { useEffect, useState } from 'react';
import ApplicationList from './ApplicationList';
import CheckboxSchools from './Filter/CheckboxSchools';
import CheckboxSubjects from './Filter/CheckboxSubjects';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import './Navigation.css';
import { schools, query, filteredApplicants, counties, subjects } from '../../atoms'



export default function Navigation({applicants}) {
  const updateQuery = useSetRecoilState(query)

  const updateSchools = useSetRecoilState(schools);

  const updateCounties = useSetRecoilState(counties);

  const updateSubjects = useSetRecoilState(subjects);

  useEffect(()  => {
    const fetchSubjects = async () => {
      const request = await fetch(`http://localhost:3100/api/subjects`)
      const result = await request.json()

      const subjectsArray = []
      result.forEach(subject => {
        subjectsArray.push(
            {
              checked: true,
              subjectName: subject.subjectName,
              subjectId: subject.subject_id,
              type: 'subject',
            }
        )
      })

      updateSubjects(subjectsArray)
    }

    fetchSubjects()
  }, [])

  useEffect(()  => {
    const fetchSchools = async () => {
      const request = await fetch(`http://localhost:3100/api/schools`)
      const result = await request.json()

      const schoolsArray = []
      result.forEach(school => {
        schoolsArray.push(
            {
              checked: true,
              schoolName: school.schoolName,
              schoolId: school.orgnr,
              countyNumber: school.countyNumber,
              type: 'school',
            }
        )
      })

      updateSchools(schoolsArray)
    }

    fetchSchools()
  }, [])

  useEffect(()  => {
    const fetchCounties = async () => {
      const request = await fetch(`http://localhost:3100/api/counties`)
      const result = await request.json()

      const countiesArray = []
      result.forEach(county => {
        countiesArray.push(
            {
              checked: true,
              countyName: county.name,
              countyNumber: county.countyNumber,
              type: 'county',
            }
        )
      })

      updateCounties(countiesArray)
    }

    fetchCounties()
  }, [])

  
  
  return (
    <div className="nav">
      <h3>search</h3>
      <input type="text" placeholder="Search..." onChange={e => updateQuery(e.target.value)} />
      <CheckboxSubjects />
      <CheckboxSchools /> 
    </div>
  )
}