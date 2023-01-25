import React, { Component } from "react";
import { render } from "react-dom";

export default function CheckboxFilter( {checkboxFilter, handleCheckboxChange} ) {
  return(
    <>
      <div>
        <ul>
          {checkboxFilter.map((school, study) => (
            <li key={school.schoolId} >
              <input type="checkbox" checked={school.checked} onChange={() => handleCheckboxChange(school.schoolId)} />
              <label>{school.schoolName}</label>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}