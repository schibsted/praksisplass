import { useEffect, useState } from 'react';
import ApplicationList from './ApplicationList';
import CheckboxFilter from './CheckboxFilter';
import './Navigation.css';

export default function Navigation ({applicants}) {
  const [query, setQuery] = useState('');
  const [schools, setSchools] = useState([]);

  const handleCheckboxChange = (schoolId) => {
    setSchools(state => {
      return state.map(school => {
        if (school.schoolId === schoolId) {
          return {
            ...school,
            checked: !school.checked,
          }
        }
        return school
      })
    })
  }

  useEffect(() => {
    const fetchStudies = async () => {
      const request = await fetch(`http://localhost:3100/api/studies`)
      const result = await request.json()

      console.log(result)
    }

    fetchStudies()
  })

  useEffect(() => {
    const fetchSchools = async () => {
      const request = await fetch(`http://localhost:3100/api/schools`)
      const result = await request.json()
      
      const schoolsArray = []
      result.forEach(school => {
        schoolsArray.push(
            {
              checked: true,
              schoolName: school.schoolName,
              schoolId: school.orgnr,
            }
        )
      })

      setSchools(schoolsArray)
    }

    fetchSchools()
  }, [])

  const search = (data) =>  {
    const schoolArray = schools.filter(school => school.checked === true)
    const schoolIdArray = schoolArray.map(school => school.schoolId)
    data = data.filter(item => schoolIdArray.includes(item.schoolOrgnr))

    return data.filter(item=>item.firstname.toLowerCase().includes(query.toLowerCase()))
  };
  
  return (
    <div>
      <h1>search</h1>
      <input type="text" placeholder="Search..." onChange={e => setQuery(e.target.value)} />
      <CheckboxFilter checkboxFilter={schools} handleCheckboxChange={handleCheckboxChange} />
      <ApplicationList applicants={search(applicants)}/>
    </div>
  )
}