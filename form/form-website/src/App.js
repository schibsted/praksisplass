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

    console.log(applicationLetter)

    // const data = {
    //   firstname: firstname,
    //   lastname: lastname,
    //   email: email,
    //   phoneNumber: phoneNumber,
    //   school: school,
    //   study: study,
    //   applicationLetter: applicationLetter,
    // }

    // const fetchAPI = async (data) => {
    //   const request = await fetch(`http://localhost:3100/upload`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: JSON.stringify(data)
    //   })

    //   const promise = await request.json()

    //   return promise
    // } 

    // fetchAPI(data).then(res => {
    //   console.log(res.name)
    // })
  }  

  return (
    <div className="App">
      <h1>Søknad</h1>
      <form action='#' id='applicationForm'>
        <label>Fornavn:</label>
        <input type="text" placeholder='Fornavn' onChange={e => setFirstname(e.target.value)}></input>
        <label>Etternavn:</label>
        <input type="text" placeholder='Etternavn' onChange={e => setLastname(e.target.value)}></input>
        <label>E-post:</label>
        <input type="text" placeholder='E-post' onChange={e => setEmail(e.target.value)}></input>
        <label>Telefonnummer:</label>
        <input type="text" placeholder='Tlf' onChange={e => setPhoneNumber(e.target.value)}></input>
        <label>Skole:</label>
        <input type="text" placeholder='Skole' onChange={e => setSchool(e.target.value)}></input>
        <label>Linje:</label>
        <input type="text" placeholder='Linje' onChange={e => setStudy(e.target.value)}></input>
        <label>Søknad(pdf):</label>
        <input type="file" onChange={e => setApplicationLetter(e)} />
        <input type="submit" onClick={e => handleSubmit(e)}></input>
      </form>
    </div>
  );
}

export default App;
