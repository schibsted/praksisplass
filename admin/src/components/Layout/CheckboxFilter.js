import React, { useState } from 'react';

function CheckboxFilter({ options, onChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function handleOptionChange(option) {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(o => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    onChange(selectedOptions);
  }

  return (
    <div>
      {options.map(option => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleOptionChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default CheckboxFilter;
﻿