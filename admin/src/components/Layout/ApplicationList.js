import { Link } from 'react-router-dom';

export default function ApplicationList({ applicants }) {
  return (
    <div>
      <h2>Applicants</h2>
      <ul>
        {applicants.map(application => (
          <li key={application.id}>
            <Link to={`/application/${application.id}`}>
            <div>
            {application.firstname + ' ' + application.lastname}
            </div>
            <div>
            {application.email}
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}