import React from "react";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { schools, counties } from '../../../atoms';
import './CheckboxSchools.css';

export default function CheckboxSchools() {
  const schoolsState = useRecoilValue(schools)
  const updateSchools = useSetRecoilState(schools)
  
  const countiesState = useRecoilValue(counties)
  const updateCounties = useSetRecoilState(counties)


  const checkboxesArray = []

  countiesState.forEach(county => {
    checkboxesArray.push(county)
    schoolsState.forEach(school => {
      if (school.countyNumber === county.countyNumber) {
        checkboxesArray.push(school)
      }
    })
  })

  const handleCheckboxChange = (object) => {
    if (object.type === 'school') {
      updateSchools(state => {
        return state.map(school => {
          if (school.schoolId === object.schoolId) {
            return {
              ...school,
              checked: !school.checked,
            }
          }
          return school
        })
      })
    }
    else if (object.type === 'county') {
      let checked = null
      updateCounties(state => {
        return state.map(county => {
          if (county.countyNumber === object.countyNumber) {
            checked = !county.checked
            return {
              ...county,
              checked: !county.checked,
            }
          }
          return county
        })
      })

      updateSchools(state => {
        return state.map(school => {
          if (school.countyNumber === object.countyNumber) {
            return {
              ...school,
              checked: checked,
            }
          }
          return school
        })
      })
    }
  }

  return(
    <>
      <div>
        <ul className="school-list">
        <h3 className="title-school">Skoler</h3>
          {checkboxesArray.map((checkbox) => {
            if (checkbox.type === 'county') {
              return (
                <li key={checkbox.countyNumber}>
                  <div className="school-list-county">
                   <input type="checkbox" className="checkboxCounty" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox)} />
                   <label className="checkboxName">{checkbox.countyName}</label>
                  </div>
            </li>
              )
            }
            else {
              return (
                <li key={checkbox.schoolId} className="filter-school">
                  <div className="school-list-school">
                    <input type="checkbox" className="checkboxSchool" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox)} />
                    <label className="checkboxName">{checkbox.schoolName}</label>
                  </div>
              </li>
              )
            }
          })}
        </ul>
      </div>
    </>
  )
}