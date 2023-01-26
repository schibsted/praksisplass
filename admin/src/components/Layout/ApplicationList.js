import { Link } from 'react-router-dom';
import { schools, query, filteredApplicants } from '../../atoms';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';


export default function ApplicationList({ applicants }) {
  const filteredApplicantsState = useRecoilValue(filteredApplicants)
  const updateFilteredApplicants = useSetRecoilState(filteredApplicants)

  const schoolsState = useRecoilValue(schools)

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
     updateFilteredApplicants(newFilteredApplicants)
 }, [schoolsState])


  return (
      <table>
        <h2>Applicants</h2>
        <tbody>
          {search(filteredApplicantsState).map(application => (
            <tr key={application.id}>
             <Link to={`/application/${application.id}`}>
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
  );
}