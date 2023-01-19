import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [school, setSchool] = useState()
  const [study, setStudy] = useState()
  const [applicationLetter, setApplicationLetter] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append("firstname", firstname)
    formData.append("lastname", lastname)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("school", school)
    formData.append("study", study)
    
    for(let i =0; i < applicationLetter.length; i++) {
      formData.append("files", applicationLetter[i]);
}

    const fetchAPI = async (data) => {
      const request = await fetch(`http://localhost:3100/upload`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data'
          // 'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })

      const promise = await request.json()

      return promise
    } 

    fetchAPI(formData).then(res => {
      console.log(res.name)
    })
  }  

  return (
    <div className="App">
      <h1>Søknad</h1>
      <form action="#" id="applicationForm">
        <label>Fornavn:</label>
        <input type="text" placeholder="Fornavn" onChange={e => setFirstname(e.target.value)} />
        <label>Etternavn:</label>
        <input type="text" placeholder="Etternavn" onChange={e => setLastname(e.target.value)} />
        <label>E-post:</label>
        <input type="email" placeholder="E-post" onChange={e => setEmail(e.target.value)} />
        <label>Telefonnummer:</label>
        <input type="tel" placeholder="Tlf" onChange={e => setPhoneNumber(e.target.value)} />
        <label>Skole:</label>
        <input type="text" placeholder="Skole" onChange={e => setSchool(e.target.value)} />
        <label>Linje:</label>
        <input type="text" placeholder="Linje" onChange={e => setStudy(e.target.value)} />
        <label>Filer(pdf):</label>
        <input type="file"  multiple accept="application/pdf" onChange={e => setApplicationLetter(e.target.files)} />
        <input type="submit" onClick={e => handleSubmit(e)} />
      </form>
    </div>
  );
}

export default App;
