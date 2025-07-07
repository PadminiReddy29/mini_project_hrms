import React, { useEffect, useState } from 'react';
import { getTeamHierarchy } from './services/teamservices';

function Team() {
  const empId = localStorage.getItem('emp_id');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await getTeamHierarchy(empId);
        setData(res);
      } catch (err) {
        console.error('Error:', err);
      }
    }

    fetchTeam();
  }, [empId]);

  if (!data) return <p>Loading team data...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Team Hierarchy</h2>

      <div>
        <h4>Reporting To:</h4>
        {data.reporting_to.length > 0 ? (
          data.reporting_to.map((person) => (
            <p key={person.emp_id}>
              {person.username} ({person.role})
            </p>
          ))
        ) : (
          <p>No superiors</p>
        )}
      </div>

      <div>
        <h4>You:</h4>
        <p>
          {data.username} ({data.role})
        </p>
      </div>

      <div>
        <h4>Direct Reports:</h4>
        {data.are_reporting.length > 0 ? (
          data.are_reporting.map((person) => (
            <p key={person.emp_id}>
              {person.username} ({person.role})
            </p>
          ))
        ) : (
          <p>No subordinates</p>
        )}
      </div>
    </div>
  );
}

export default Team;
