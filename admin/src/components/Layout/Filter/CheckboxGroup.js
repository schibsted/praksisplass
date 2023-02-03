import React, { useState } from "react";

export default function CheckboxGroup({mainItem, items, callback}) {
    const [checkedItems, setCheckedItems] = useState(new Map());
    const [mainItemChecked, setMainItemChecked] = useState(false);
    
    return (
        <div>
            <h3 className="title-school">Skoler</h3>
            <ul className="school-list">
                    <li >
                    <div className="school-list-county">
                    <input type="checkbox" className="checkboxCounty" checked={mainItemChecked} onChange={() => {
                        setMainItemChecked(!mainItemChecked);
                        items.map
                    }} />
                    <label className="checkboxName">{mainItem.label}</label>
                    </div>
                </li>

                    <li key={checkbox.schoolId} className="filter-school">
                    <div className="school-list-school">
                        <input type="checkbox" className="checkboxSchool" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox)} />
                        <label className="checkboxName">{checkbox.schoolName}</label>
                    </div>
                </li>
            </ul>
        </div>
    )
}