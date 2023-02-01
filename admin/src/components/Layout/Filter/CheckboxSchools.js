import React, { Component, useState } from "react";
import { render } from "react-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { schools, counties } from '../../../atoms'

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
        <h3>Filter by County</h3>
        <ul>
          {checkboxesArray.map((checkbox) => {
            if (checkbox.type === 'county') {
              return (
                <li key={checkbox.countyNumber} >
              <input type="checkbox" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox)} />
              <label>{checkbox.countyName}</label>
            </li>
              )
            }
            else {
              return (
                <li key={checkbox.schoolId} >
                <input type="checkbox" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox)} />
                <label>{checkbox.schoolName}</label>
              </li>
              )
            }
          })}
        </ul>
      </div>
    </>
  )
}