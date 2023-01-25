import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ApplicationForm.css'

const ApplicationForm = ({props}) => {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [tel, setTel] = useState()
    const [county, setCounty] = useState()
    const [school, setSchool] = useState()
    const [subject, setSubject] = useState()
    const [position, setPosition] = useState()
    const [files, setFiles] = useState()

    const [counties, setCounties] = useState()
    const [schools, setSchools] = useState()
    const [subjects, setSubjects] = useState()
    const [positions, setPositions] = useState()

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
        }

        fetchSchools()
    }, [])

    useEffect(() => {
        const fetchSubjects = async () => {
            const request = await fetch(`http://localhost:3100/get-subject-areas`)
            const result = await request.json()
            setSubjects(result)
        }

        fetchSubjects()
    }, [])

    useEffect(() => {
        const fetchPositions = async () => {
            const request = await fetch(`http://localhost:3100/get-positions`)
            const result = await request.json()
            setPositions(result)
        }

        fetchPositions()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        formData.append("email", email)
        formData.append("tel", tel)
        formData.append("school", school)
        formData.append("subject", subject)
        formData.append("position", position)
        
        if (files){
            for(let i =0; i < files.length; i++) {
                formData.append("files", files[i]);
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

        fetchAPI(formData)
    }

    const removeFile = (index) => {
        const remainingFiles = files.filter((file, i) => i !== index)
        setFiles(remainingFiles)
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
                <input type="tel" placeholder="Tlf" onChange={e => setTel(e.target.value)} />
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
                
                <label>Fagområde:</label>
                <select onChange={e => setSubject(e.target.options[e.target.selectedIndex].id)}>
                    <option>Velg fagområde</option>

                    {subjects?.map(subject => {
                        return <option key={subject.id} id={subject.id}>{subject.name}</option>
                    })}
                </select>

                <label>Stilling:</label>
                <select onChange={e => setPosition(e.target.options[e.target.selectedIndex].id)}>
                    <option>Velg stilling</option>
                    {positions?.map(position => {
                        return <option key={position.id} id={position.id}>{position.type}</option>
                    })}
                </select>

                <label>CV og søknad:</label>
                <label className="input-file">
                    <span class="material-symbols-outlined">
                        upload_file
                    </span>
                    Velg fil(pdf)
                    <input type="file"  multiple accept="application/pdf" files={files} onChange={e => setFiles(Array.from(e.target.files))} />
                </label>

                {files?.length > 0 && (
                    <div className="file-list">
                        {files.map(file => (
                            <div className="show-selected-files" key={file.name}>
                                <span className="file-name">{file.name}</span>
                                <button className="remove-file" key={file.name} onClick={e => removeFile(files.indexOf(file))}>X</button>
                            </div>
                        ))}
                    </div>
                )}

                <input type="submit" onClick={e => handleSubmit(e)} />
            </form>
        </div>
    )
   
}

export default ApplicationForm