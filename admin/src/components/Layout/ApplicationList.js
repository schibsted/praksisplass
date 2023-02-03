import { Link } from 'react-router-dom';
import { schools, subjects, query, filteredApplicants } from '../../atoms';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import './ApplicationList.css'

export default function ApplicationList({ applicants }) {
  const filteredApplicantsState = useRecoilValue(filteredApplicants)
  const updateFilteredApplicants = useSetRecoilState(filteredApplicants)

  const schoolsState = useRecoilValue(schools)

  const subjectsState = useRecoilValue(subjects)

  const queryState = useRecoilValue(query)
  const updateQuery = useSetRecoilState(query)

  const search = (data) =>  {
    return data.filter(item=>item.firstname?.toLowerCase().includes(queryState.toLowerCase()))
  };

  const filter = () => {
    
  }

  useEffect(() => {
    updateFilteredApplicants(applicants)

    updateFilteredApplicants(state => {
      return state.filter(applicant => {
        let schoolMatch = false
        schoolsState.forEach(school => {
          if (school.checked === true && school.schoolId === applicant.schoolOrgnr) {
            schoolMatch = true
          }
        })
        
        return schoolMatch
      })
    })

    updateFilteredApplicants(state => {
      return state.filter(applicant => {
        let subjectMatch = false
        subjectsState.forEach(subject => {
          if (subject.checked === true && subject.subjectId === applicant.subjectId) {
            subjectMatch = true
          }
        })
        
        return subjectMatch
      })
    })

    
 }, [applicants, schoolsState, subjectsState])

 
  return (
    <div className='applicantList-container'>
      <div className='title'>
        <h3>Søkere</h3>
      </div>
      <ul className="applicants-list">
            {search(filteredApplicantsState).map(application => (
              <Link to={`/application/${application.id}`}>
                <li className='applicants-list-item'>
                  <p className='applicant-name'>{application.firstname + ' ' + application.lastname}</p>
                  <p className='applicant-email'>{application.email}</p>
                </li>
                </Link>
              ))}
        </ul>
    </div>
  );
}