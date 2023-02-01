import React, { useState } from 'react';
import './Desicion.css'

export default function Desicion( { status, setStatus } ) {
    const [showActions, setShowActions] = useState(false)
    
    let className = ''

    if (status.completed === false) {
        className = 'border-blue'
    }
    else if (status.action.decision === 'accepted') {
        className = 'bacground-color-green icon-checked'
    }
    else if (status.action.decision === 'rejected') {
        className = 'bacground-color-red icon-remove'
    }

    console.log(status)

    return (
        <div className="status-content-status">
            <button className={`status-content-button tooltip ${className}`} onClick={() => setShowActions(!showActions)}>
                <span class={`tooltiptext ${showActions ? 'tooltip-active' : ''}`}>
                    {status.action?.options.map(option => {
                        return(
                            <div className="status-content-status">
                                <button id={option.key} className={`status-content-button ${option.class}`} onClick={e => setStatus(e.target.id)}></button>
                                <p className="applicant-content-p">{option.displayValue}</p> 
                            </div>
                        )
                    })}
                </span>
            </button>
            <div className="applicant-content-p">{status.displayValue}</div>
        </div>

        
    )
}


        




// import React, { useEffect, useState } from 'react';
// import { useSetRecoilState, useRecoilValue } from 'recoil';
// import { applicant } from './atom';

// export default function Desicion( { handleClick } ) {
//     const [desicions, setDesicions] = useState([{
//             status: 'Accepted',
//             icon: 'radio_button_unchecked',
//             class: '',
//         },
//         {
//             status: 'Rejected',
//             icon: 'radio_button_unchecked',
//             class: '',
//         }]);

//     const applicantState = useRecoilValue(applicant);

//     useEffect(() => {
//         if (applicantState.status === 'Accepted' || applicantState.status === 'Rejected') {
//             setDesicions(state => {
//                 console.log(state);
//                 return state.filter(desicion => desicion.status === applicantState.status).map(desicion => {
//                     if (desicion.status === 'Accepted') {
//                         return {
//                             ...desicion,
//                             icon: 'check_circle',
//                             class: 'status-content-icon-accepted'
//                         }
//                     }
//                     else {
//                         return {
//                             ...desicion,
//                             icon: 'cancel',
//                             class: 'status-content-icon-rejected'
//                         }
//                     }
//                 })
//             });
//         }
//         else {
//             setDesicions([{
//                 status: 'Accepted',
//                 icon: 'radio_button_unchecked',
//                 class: '',
//             },
//             {
//                 status: 'Rejected',
//                 icon: 'radio_button_unchecked',
//                 class: '',
//             }]);
//         }
//     }, [applicantState]);

//     console.log(desicions);

//     return (
//         <div>
            
//             <div className="status-content-status">
//             <span className={`material-icons status-content-icon`}>check_circle
//             <select className={'status-content-desicion'} onChange={(e) => handleClick(e.target.id)}>
//                     {desicions?.map(desicion => {
//                         return (
//                             <option value={desicion.status}></option>
//                         )
//                     })}
//             </select>
//             </span>
//                 <p className="applicant-content-p">Desicion</p>
//             </div>
                
//         </div>
//     );
// }