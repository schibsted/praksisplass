import React from "react";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { subjects } from '../../../atoms';
import './CheckboxSubjects.css';

export default function CheckboxSubjects() {
    const subjectsState = useRecoilValue(subjects)
    const updateSubjects = useSetRecoilState(subjects)

    const checkboxesArray = []

    subjectsState.forEach(subject => {
        checkboxesArray.push(subject)
    })

    const handleCheckboxChange = (subjectId) => {
          updateSubjects(state => {
            return state.map(subject => {
              if (subject.subjectId === subjectId) {
                return {
                  ...subject,
                  checked: !subject.checked,
                }
              }
            return subject
        })
      })
    }

    return(
        <>
          <div>
            <ul className="subject-list">
              <h3 className="title-subject">Linjer</h3>
                {checkboxesArray.map((subject) => {
                  return (
                    <li key={subject.subjectId}>
                      <div className="subject-list-item">
                        <label>
                          <input type="checkbox" className="checkboxSubject" value={subject.subjectId} checked={subject.checked} onChange={() => handleCheckboxChange(subject.subjectId)}/>
                          <label className="checkboxName">{subject.subjectName}</label>
                        </label>
                      </div>
                    </li>
                  )
               })}
            </ul>
          </div>
        </>
      )
}