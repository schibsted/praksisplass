import { useSetRecoilState, useRecoilValue } from 'recoil';
import { applicant } from './atom';
import './Name.css'

export default function Name() {
    const applicantState = useRecoilValue(applicant);

    return (
        <div className="name-container">
            <h1 className="full-name">{`${applicantState.firstname} ${applicantState.lastname}`}</h1>
            
            <ul className="categories">
                <li>{applicantState.subjectName}</li>
                <li>{applicantState.schoolName}</li>
                <li>{applicantState.positionType}</li>
            </ul>
        </div>
    );
}