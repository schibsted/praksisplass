import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './index.css'

export default function Applicant() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState({});

  const { firstname, lastname, email, tel, schoolName, subjectName } = applicant;

  useEffect(() => {
    async function getApplicant() {
      const request = await fetch(`http://localhost:3100/api/applications/${id}`)
      const applicants = await request.json()

      if (applicants.length > 0) {
        setApplicant(applicants[0]);
      } 
    }

    getApplicant();
  }, [id]);
      
  return (
    <div className="applicant">
      <h2>Applicant</h2>
      <div>
        {firstname} {lastname}
      </div>
      <div>
        {email}
      </div>
      <div>
        {tel}
      </div>
      <div>
        {schoolName}
      </div>
      <div>
        {subjectName}
      </div>
    </div>
  );
}