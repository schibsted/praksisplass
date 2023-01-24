import { Link } from 'react-router-dom';

export default function ApplicationList({ applicants }) {
  return (
      <table>
        <h2>Applicants</h2>
        <tbody>
          {applicants.map(application => (
            <tr key={application.id}>
             <Link to={`/application/${application.id}`}>
              <div>
             {application.firstname + ' ' + application.lastname}
             </div>
             <div>
              {application.email}
             </div>
            </Link>
           </tr>
           ))}
        </tbody>
      </table>
  );
}