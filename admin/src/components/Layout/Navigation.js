import { useState } from 'react';
import ApplicationList from './ApplicationList';
import CheckboxFilter from './CheckboxFilter';

export default function Navigation ({applicants}) {
  const [query, setQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const search = (data) =>  {
    return data.filter(item=>item.firstname.toLowerCase().includes(query.toLowerCase()))
  };
  
  return (
    <div>
      <h1>search</h1>
      <input type="text" placeholder="Search..." onChange={e => setQuery(e.target.value)} />
      <CheckboxFilter options={['F21', 'Kuben']} onChange={setSelectedOptions} />
      <ApplicationList applicants={search(applicants)}/>
    </div>
  )
}