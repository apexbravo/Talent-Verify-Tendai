import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    // Fetch employee data from Django backend
    axios.get('http://127.0.0.1:8000/api/employees/')
      .then((response) => {
        // Update the state with the fetched data
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filteredEmployees with all employees
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filter employees based on the search term
    const filtered = employees.filter((employee) => {
      const name = employee.name.toLowerCase();
      const employeeId = employee.employee_id.toLowerCase();
      const department = employee.department.toLowerCase();
      const role = employee.role.toLowerCase();
      const yearStarted = employee.date_started.toLowerCase();
      const yearLeft = employee.date_left.toLowerCase();

      return (
        name.includes(searchTerm.toLowerCase()) ||
        employeeId.includes(searchTerm.toLowerCase()) ||
        department.includes(searchTerm.toLowerCase()) ||
        role.includes(searchTerm.toLowerCase()) ||
        yearStarted.includes(searchTerm.toLowerCase()) ||
        yearLeft.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredEmployees(filtered);
  };

  return (
    <div className='container mt-5'>
      <h1 className='mt-5'>Employee List</h1>

      {/* Add a search input */}
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control mb-3"
      />

      <table className="table  table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Department</th>
            <th scope="col">Role</th>
            <th scope="col">Date Started</th>
            <th scope="col">Date Left</th>
            <th scope="col">Duties</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
                {/* Create a link to the employee details page */}
                <Link to={`/employee/${employee.id}`}>{employee.name}</Link>
              </td>
              <td>{employee.employee_id}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>{employee.date_started}</td>
              <td>{employee.date_left}</td>
              <td>{employee.duties}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
