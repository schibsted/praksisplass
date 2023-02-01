import React, { Component, useState } from "react";
import { render } from "react-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { subjects } from '../../../atoms';

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
            <h3>Filter by Subject</h3>
            <ul>
                {checkboxesArray.map((subject) => {
                  return (
                    <li key={subject.subjectId}>
                      <label>
                        <input
                          type="checkbox"
                          value={subject.subjectId}
                          checked={subject.checked}
                          onChange={() => handleCheckboxChange(subject.subjectId)}
                        />
                        {subject.subjectName}
                      </label>
                    </li>
                  )
               })}
            </ul>
          </div>
        </>
      )
}