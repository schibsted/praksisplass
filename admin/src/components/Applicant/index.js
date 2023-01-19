import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

export default function Applicant() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState({});

  const { firstname, lastname, email, phoneNumber, Schools_has_study_Schools_name: school, Schools_has_study_study_study: study } = applicant;

  useEffect(() => {
    async function getApplicant() {
      const applicants = await fetch(`http://localhost:3100/api/applications/${id}`)
        .then(res => res.json());

      if (applicants.length > 0) {
        setApplicant(applicants[0]);
      } 
    }

    getApplicant();
  }, [id]);

  console.log({id})
      
  return (
    <div>
      <h2>Applicant</h2>
      <div>
        {firstname} {lastname}
      </div>
      <div>
        {email}
      </div>
      <div>
        {phoneNumber}
      </div>
      <div>
        {school}
      </div>
      <div>
        {study}
      </div>
    </div>
  );
}