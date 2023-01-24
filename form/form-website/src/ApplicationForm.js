import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ApplicationForm.css'

const ApplicationForm = ({props}) => {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [county, setCounty] = useState()
    const [school, setSchool] = useState()
    const [study, setStudy] = useState()
    const [applicationLetter, setApplicationLetter] = useState()

    const [counties, setCounties] = useState()
    const [schools, setSchools] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCounties = async () => {
            const request = await fetch('https://data.ssb.no/api/klass/v1/versions/1158.json')
            const result = await request.json()
            setCounties(result.classificationItems)
        }

        fetchCounties()
    }, [])

    useEffect(() => {
        const fetchSchools = async () => {
            const request = await fetch(`https://data-nsr.udir.no/v3/enheter/skolekategori/2`)
            const result = await request.json()
            setSchools(result)
            console.log(result)
        }

        fetchSchools()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        formData.append("email", email)
        formData.append("phoneNumber", phoneNumber)
        formData.append("school", school)
        formData.append("study", study)
        
        if (applicationLetter){
            for(let i =0; i < applicationLetter.length; i++) {
                formData.append("files", applicationLetter[i]);
            }
        }

        const fetchAPI = async (data) => {
            const request = await fetch(`http://localhost:3100/send-form`, {
                method: 'POST',
                headers: {
                // 'Content-Type': 'multipart/form-data'
                // 'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data,
            })

            const promise = await request.json()

            navigate('/application-is-sent')

            return promise
        } 

        fetchAPI(formData).then(res => {
            console.log('res')
        })
    }

    return (
        <div id='applicationForm'>
            <h1>Søknad</h1>
            <form action="#">
                <label>Fornavn:</label>
                <input type="text" placeholder="Fornavn" onChange={e => setFirstname(e.target.value)} />
                <label>Etternavn:</label>
                <input type="text" placeholder="Etternavn" onChange={e => setLastname(e.target.value)} />
                <label>E-post:</label>
                <input type="email" placeholder="E-post" onChange={e => setEmail(e.target.value)} />
                <label>Telefonnummer:</label>
                <input type="tel" placeholder="Tlf" onChange={e => setPhoneNumber(e.target.value)} />
                <label>Fylke:</label>
                <select onChange={e => setCounty(e.target.options[e.target.selectedIndex].id)}>
                    <option>Velg fylke</option>
                    {counties?.map(county => {
                        if (county.name == 'Uoppgitt') return
                        return <option key={county.code} id={county.code}>{county.name}</option>
                    })}
                </select>

                {county && (
                    <>
                    <label>Skole:</label>
                    <select onChange={e => setSchool(e.target.options[e.target.selectedIndex].id)}>
                        <option>Velg skole</option>
                        {schools?.filter(school => school.Fylkesnr === county).map( school => (
                            <option key={school.Orgnr} id={school.Orgnr}>{school.Navn}</option>
                        ))}
                    </select>
                    </>
                )}
                
                <label>Linje:</label>
                <input type="text" placeholder="Linje" onChange={e => setStudy(e.target.value)} />
                <label>Filer(pdf):</label>
                <input type="file"  multiple accept="application/pdf" onChange={e => setApplicationLetter(e.target.files)} />
                <input type="submit" onClick={e => handleSubmit(e)} />
            </form>
        </div>
    )
   
}

export default ApplicationForm