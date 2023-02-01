import React, { useState , useEffect} from 'react'
import '../../googleFonts.css'
import './Status.css'
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { applicant, status } from './atom';
import Desicion from './Desicion';

export default function Status() {
    const [statuses, setStatuses] = useState(['Recieved', 'Assigned', 'Reviewed', 'Accepted', 'Rejected']);

    const applicantState = useRecoilValue(applicant);
    const updateApplicant = useSetRecoilState(applicant);

    const statusState = useRecoilValue(status);
    const updateStatus = useSetRecoilState(status);

    const setStatus = async (status) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: applicantState.id, status: status })
        };
        
        // await fetch('http://localhost:3100/api/status', requestOptions)

        updateApplicant({
            ...applicantState,
            status: status
        })
    }

    return (
        <div className="applicant-content-container">
            <div className="applicant-content-header">
                <h2 className="applicant-title">Status</h2>
                <h3 className="applicant-subtitle">Søknadens status</h3>
            </div>

            <div className="status-content">
                {statusState.map((status) => {
                    let containerClasses = " "
                    let iconClasses = " "

                    if (status.completed == true) {
                        containerClasses += "bacground-color-blue"
                        iconClasses += "icon-checked"
                    }
                    else {
                        containerClasses += "border-blue"
                    }

                    if (status.action?.type === 'decision') {
                        return <Desicion status={status} setStatus={setStatus} />
                    }

                    return (
                        <div className="status-content-status">
                            <button id={status.key} className={"status-content-button" + containerClasses + iconClasses} onClick={e => setStatus(e.target.id)}></button>
                            <p className="applicant-content-p">{status.displayValue}</p> 
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// if (status === 'Accepted' && applicantState.status === 'Accepted') {
//     additionalClass = "status-content-icon-accepted"
//     icon = "check_circle"
// } else if (status === 'Rejected' && applicantState.status === 'Rejected') {
//     additionalClass = "status-content-icon-rejected"
//     icon = "cancel"
// } 

// if (statuses.length === 5) {
//     if (status === 'Accepted' || status === 'Rejected') {
//         additionalClass += " status-content-icon-shifted"
//     }
// }