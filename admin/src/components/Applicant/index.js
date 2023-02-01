import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { applicant, status } from './atom';
import Name from './Name';
import Options from './Options';
import Info from './Info';
import Status from './Status';
import './index.css';

export default function Applicant() {
  const { id } = useParams();

  const applicantState = useRecoilValue(applicant);
  const updateApplicant = useSetRecoilState(applicant);

  const statusState = useRecoilValue(status);
  const updateStatus = useSetRecoilState(status);


  useEffect(() => {
    async function getApplicant() {
      const request = await fetch(`http://localhost:3100/api/applications/${id}`)
      const applicant = await request.json()

      updateApplicant(applicant);
    }

    getApplicant();
  }, [id]);

  useEffect(() => {
    let possibleStatuses = ['recieved', 'assigned', 'reviewed', 'accepted', 'rejected'];

    let index = possibleStatuses.indexOf(applicantState.status);

    updateStatus((prev) => {
      return prev?.map((status, i) => {
        if (i <= index) {
          return {
            ...status,
            completed: true
          }
        }
        return {
          ...status,
          completed: false
        }

      });
    });
  }, [applicantState]);

  return (
    <div className="applicant-container">
      <div className="name-options">
        <Name />
        <Options />
      </div>
      <div className="applicant-columns-container">
        <div className="applicant-column applicant-large-column">
          <Info />
        </div>

        <div className="applicant-column applicant-small-column">
          <Status />
        </div>
      </div>
    </div>
  );
}