import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ApplicationForm.css'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';

const ApplicationForm = ({props}) => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [countyId, setCountyId] = useState("")
    const [countyName, setCountyName] = useState("")
    const [schoolId, setSchoolId] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [subject, setSubject] = useState("")
    const [position, setPosition] = useState("")
    const [files, setFiles] = useState([])

    const [counties, setCounties] = useState([])
    const [schools, setSchools] = useState([])
    const [subjects, setSubjects] = useState([])
    const [positions, setPositions] = useState([])

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

        console.log({firstame: firstname, lastname: lastname, email: email, tel: tel, countyId: countyId, countyName: countyName, schoolId: schoolId, schoolName: schoolName, subject: subject, position: position, files: files})

        const formData = new FormData()

        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        formData.append("email", email)
        formData.append("tel", tel)
        formData.append("countyId", countyId)
        formData.append("countyName", countyName)
        formData.append("schoolId", schoolId)
        formData.append("schoolName", schoolName)
        formData.append("subject", subject)
        formData.append("position", position)
        
        if (files){
            for(let i =0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }

        console.log(formData)

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

    const handleCountyChange = (event) => {
        const county = counties.find(county => county.code === event.target.value)
        if (county) {
            setCountyName(county.name);
            setCountyId(county.code); 
        }
        else {
            setCountyName("")
            setCountyId("")
        }
    };

    const handleSchoolChange = (event) => {
        const school = schools.find(school => school.Orgnr === event.target.value)
        console.log(school, schools)
        if (school) {
            setSchoolName(school.Navn);
            setSchoolId(school.Orgnr); 
        }
        else {
            setSchoolName("")
            setSchoolId("")
        }
    };

    const handleSubjectChange = (event) => {
        const subject = subjects.find(subject => subject.subject_id === event.target.value)
        if (subject) {
            setSubject(subject.subject_id);
        }
        else {
            setSubject("")
        }
    }

    const handlePositionChange = (event) => {
        const position = positions.find(position => position.position_id === event.target.value)
        if (position) {
            setPosition(position.position_id); 
        }
        else {
            setPosition("")
        }
    }

    return (
        <div className="background">
            <div className="application-form-container">
                <form action="#" className="application-form-form">
                    <div className="application-form-inputs">
                            <TextField required className="application-form-input" label="Fornavn" variant="outlined" size="small" onChange={e => setFirstname(e.target.value)} />
                            <TextField required className="application-form-input" label="Etternavn" variant="outlined" size="small" onChange={e => setLastname(e.target.value)} />
                            <TextField required className="application-form-input" label="E-post" variant="outlined" size="small" onChange={e => setEmail(e.target.value)} />
                            <TextField required className="application-form-input" label="Telefonnummer" variant="outlined" size="small" onChange={e => setTel(e.target.value)} />

                            <FormControl required className="application-form-input" size="small">
                                <InputLabel id="demo-simple-select-required-label">Fylke</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={countyId}
                                    defaultValue=""
                                    label="Fylke *"
                                    onChange={handleCountyChange}
                                >
                                    <MenuItem value="">
                                        <em>Ingen</em>
                                    </MenuItem>
                                    {counties?.map(county => {
                                        if (county.name == 'Uoppgitt') return
                                        return <MenuItem key={county.code} value={county.code}>{county.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl required className="application-form-input" size="small">
                                <InputLabel id="demo-simple-select-required-label">Skole</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={schoolId}
                                    defaultValue=""
                                    label="Skole *"
                                    onChange={handleSchoolChange}
                                >
                                    <MenuItem value="">
                                        <em>Ingen</em>
                                    </MenuItem>

                                    {schools?.filter(school => school.Fylkesnr === countyId).map( school => (
                                        <MenuItem key={school.Orgnr} value={school.Orgnr}>{school.Navn}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl required className="application-form-input" size="small">
                                <InputLabel id="demo-simple-select-required-label" label="Fagområde">Fagområde</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={subject}
                                    defaultValue=""
                                    label="Fagområde *"
                                    onChange={handleSubjectChange}
                                >
                                    <MenuItem value="">
                                        <em>Ingen</em>
                                    </MenuItem>

                                    {subjects?.map(subject => {
                                        return <MenuItem key={subject.subject_id} value={subject.subject_id}>{subject.subjectName}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl required className="application-form-input" size="small">
                                <InputLabel id="demo-simple-select-required-label">Stilling</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={position}
                                    defaultValue=""
                                    label="Stilling *"
                                    onChange={handlePositionChange}
                                >
                                    <MenuItem value="">
                                        <em>Ingen</em>
                                    </MenuItem>

                                    {positions?.map(position => {
                                        return <MenuItem key={position.position_id} value={position.position_id}>{position.positionType}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl required className="application-form-input" size="small">
                                <Button
                                variant="contained"
                                component="label"
                                >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="application/pdf"
                                    onChange={e => setFiles(Array.from(e.target.files))}
                                />
                                </Button>
                            </FormControl>
                    </div>
                    
                    <div className="application-form-submit">
                        <FormControl required className="application-form-input" size="small">
                            <Button
                            variant="contained"
                            component="label"
                            >
                            Send søknad
                            <input
                                type="submit"
                                hidden
                                onClick={e => handleSubmit(e)}
                            />
                            </Button>
                        </FormControl>
                    </div>
                    
                    {/* <label>Fylke:</label>
                    <select onChange={e => {
                        setCountyId(e.target.options[e.target.selectedIndex].id)
                        setCountyName(e.target.options[e.target.selectedIndex].value)
                    }}>
                        <option>Velg fylke</option>

                        {counties?.map(county => {
                            if (county.name == 'Uoppgitt') return
                            return <option key={county.code} id={county.code}>{county.name}</option>
                        })}
                    </select>

                    {countyId && (
                        <>
                            <label>Skole:</label>
                            <select onChange={e => {
                                setSchoolId(e.target.options[e.target.selectedIndex].id)
                                setSchoolName(e.target.options[e.target.selectedIndex].value)
                            }}>
                                <option>Velg skole</option>

                                {schools?.filter(school => school.Fylkesnr === countyId).map( school => (
                                    <option key={school.Orgnr} id={school.Orgnr}>{school.Navn}</option>
                                ))}
                            </select>
                        </>
                    )}
                    
                    <label>Fagområde:</label>
                    <select onChange={e => setSubject(e.target.options[e.target.selectedIndex].id)}>
                        <option>Velg fagområde</option>

                        {subjects?.map(subject => {
                            return <option key={subject.subject_id} id={subject.subject_id}>{subject.subjectName}</option>
                        })}
                    </select>

                    <label>Stilling:</label>
                    <select onChange={e => setPosition(e.target.options[e.target.selectedIndex].id)}>
                        <option>Velg stilling</option>
                        {positions?.map(position => {
                            return <option key={position.position_id} id={position.position_id}>{position.positionType}</option>
                        })}
                    </select> */}

                    {/* <label>CV og søknad:</label>
                    <label className="input-file">
                        <span class="material-symbols-outlined">
                            upload_file
                        </span>
                        Velg fil
                        <input type="file"  multiple accept="application/pdf" files={files} onChange={e => setFiles(Array.from(e.target.files))} />
                    </label>

                    {files?.length > 0 && (
                        <div className="file-list">
                            {files.map(file => (
                                <div className="show-selected-files" key={file.name}>
                                    <p className="file-name">{file.name}</p>
                                    <button className="remove-file" key={file.name} onClick={e => removeFile(files.indexOf(file))}>X</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <input type="submit" onClick={e => handleSubmit(e)} /> */}
                </form>
            </div>
        </div>
    )
   
}

export default ApplicationForm