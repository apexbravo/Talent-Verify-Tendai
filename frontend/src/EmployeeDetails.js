import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null); // Initialize as null for better loading handling
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch employee data from Django backend
    axios.get(`http://127.0.0.1:8000/api/employees/${id}/`)
      .then((response) => {
        // Update the state with the fetched data
        setEmployee(response.data);
        setLoading(false); // Set loading to false once data is fetched
        // Initialize filteredEmployees with all employees
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);


  return (
    <div className='container mt-5'>
      <h2 className='mt-5'>Employee Details</h2>
      {loading ? (
        <p>Loading employee details...</p>
      ) : employee ? ( // Check if employee exists
        <div className='card'>
          <div className='card-body'>
            <p>ID: {employee.id}</p>
            <p>Name: {employee.name}</p>
            <p>Employee ID: {employee.employee_id}</p>
            <p>Department: {employee.department}</p>
            <p>Role: {employee.role}</p>
            <p>Date Started: {employee.date_started}</p>
            <p>Date Left: {employee.date_left}</p>
            <p>Duties: {employee.duties}</p>
          </div>
          <div className='card-footer text-align-end'>
            <Link to={`/EmployeeEdit/${employee.id}`} className='btn btn-primary mr-2'>Edit</Link>
          </div>
        </div>
      ) : (
        <p>No employee found with ID: {id}</p>
      )}
    </div>
  );
}

export default EmployeeDetails;
