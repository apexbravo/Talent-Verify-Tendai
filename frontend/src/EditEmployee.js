import React, { useEffect, useState } from 'react';
import AppNavbar from './Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the employee ID from the URL

  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    department: '',
    role: '',
    date_started: '',
    date_left: '',
    duties: '',
  });

  useEffect(() => {
    // Fetch existing employee details based on the ID
    axios.get(`http://127.0.0.1:8000/api/employees/${id}/`)
      .then((response) => {
        // Update the state with the fetched employee data
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee details:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the employee information
      const response = await axios.put(`http://127.0.0.1:8000/api/employees/${id}/`, formData);
      console.log('Employee updated successfully:', response.data);
      navigate(`/employee/${id}/`);
      // Redirect or perform any necessary actions after a successful update.
    } catch (error) {
      console.error('Error updating employee:', error);
      // Handle errors here.
    }
  };

  return (
    <div>
      <AppNavbar />

      <div className=' container mt-5'>
        <h1>Edit Employee</h1>
        <form className='mt-4' onSubmit={handleSubmit}>
          <div className='col-md-7 col-lg-8'>
            <div className=" card shadow">
              <div className="card-body">
                <div className="row">
                  <div className='col-sm-12 mt-3'>
                    <label className='form-label'>Full Name</label>
                    <input type='text' className='form-control' name='name' value={formData.name} onChange={handleInputChange} />
                  </div>

                  <div className='col-sm-12 mt-3'>
                    <label className='form-label'>Employee ID</label>
                    <input type='text' className='form-control' name='employee_id' value={formData.employee_id} onChange={handleInputChange} />
                  </div>
                  <div className='col-sm-12'>
                    <label className='form-label'>Department</label>
                    <input type='text' className='form-control' name='department' value={formData.department} onChange={handleInputChange} />
                  </div>
                  <div className='col-sm-12 mt-3'>
                    <label className='form-label'>Role</label>
                    <input type='text' className='form-control' name='role' value={formData.role} onChange={handleInputChange} />
                  </div>
                  <div className='col-sm-12 mt-3'>
                    <label className='form-label'>Date Started</label>
                    <input type='date' className='form-control' name='date_started' value={formData.date_started} onChange={handleInputChange} />
                  </div>
                  <div className='col-sm-12 mt-3'>
                    <label className='form-label'>Date Left</label>
                    <input type='date' className='form-control' name='date_left' value={formData.date_left} onChange={handleInputChange} />
                  </div>
                  <div className='col-sm-12 mt-3'>
                    <label className='form-label'>Duties</label>
                    <input type='text' className='form-control' name='duties' value={formData.duties} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <div className='card-footer text-end'>
                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Update</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployeeForm;
