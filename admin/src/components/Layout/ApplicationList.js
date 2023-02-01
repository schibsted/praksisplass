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

  useEffect(() => {
    const newFilteredApplicants = []
    applicants.forEach(applicant => {
       schoolsState.forEach(school => {
         if (school.checked === true && school.schoolId === applicant.schoolOrgnr) {
           newFilteredApplicants.push(applicant)
         }
       })
     })

      newFilteredApplicants.forEach(applicant => {
        subjectsState.forEach(subject => {
          if (subject.checked === false && subject.subjectId === applicant.subjectId) {
            var index = newFilteredApplicants.indexOf(applicant);
            if (index !== -1) {
              newFilteredApplicants.splice(index, 1);
}
          }
        })
      })

     updateFilteredApplicants(newFilteredApplicants)
 }, [schoolsState, subjectsState])

 
  return (
    <>
    <div classname="applicants">
      <table>
          <h2>Applicants</h2>
          <tbody>
            {search(filteredApplicantsState).map(application => (
              <tr key={application.id}>
              <Link to={`/application/${application.id}`} style={{ color:'black' }}>
                <div>
              {application.firstname + ' ' + application.lastname}
              </div>
              <div>
                {application.email}
              </div>
              </Link>
            </tr>
            ))}
          </tbody>
        </table>
    </div>
    </>
  );
}