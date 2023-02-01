import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { applicant } from './atom';
import './Info.css';
import '../../googleFonts.css'

export default function Info() {
    const applicantState = useRecoilValue(applicant);

    return (
        <div className="applicant-content-container">
            <div className="applicant-content-header">
                <h2 className="applicant-title">Informasjon om søker</h2>
                <h3 className="applicant-subtitle">Kontaktinformasjon og søknadsdokumenter</h3>
            </div>

            <div className="info-content">
                <div className="info-content-div">
                    <p className="applicant-content-p info-content-type">E-postadresse</p>
                    <p className="applicant-content-p">{applicantState.email}</p>
                </div>

                <div className="info-content-div">
                    <p className="applicant-content-p info-content-type">Telefonnummer</p>
                    <p className="applicant-content-p">{applicantState.tel}</p>
                </div>

                <div className="info-content-div">
                    <p className="applicant-content-p info-content-type">Skole</p>
                    <p className="applicant-content-p">{applicantState.schoolName}</p>
                </div>

                <div className="info-content-div">
                    <p className="applicant-content-p info-content-type">Linje</p>
                    <p className="applicant-content-p">{applicantState.subjectName}</p>
                </div>
            </div>

            <div className="info-files">
                <p className="applicant-content-p info-content-type">Vedlegg</p>
                <div className="info-files-list">
                    {applicantState.files?.map((file) => {
                        return (
                            <a href={file.url} target="_blank" className="info-file-link">
                                <div className="info-file">
                                    <div className="info-file-filename">
                                        <span className="material-icons info-file-icon" >attach_file</span>
                                        <p className="applicant-content-p info-content-info">{file.filename}</p>
                                    </div>

                                    <div className="info-file-download">
                                        <span className="material-icons info-file-icon">open_in_new</span>
                                    </div>
                                </div> 
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}