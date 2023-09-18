import React, { useState } from 'react';
import AppNavbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddEmployeeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    department: '',
    role: '',
    date_started: '',
    date_left: '',
    duties: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/employees/add/', formData);
      console.log('Employee added successfully:', response.data);
      navigate('/EmployeeList');
      // Redirect or perform any necessary actions after a successful submission.
    } catch (error) {
      console.error('Error adding employee:', error);
      // Handle errors here.
    }
  };

  return (
    <div>
      <AppNavbar />

      <div className=' container mt-5'>
        <h1>Add Employee</h1>
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
                <button type="submit" className="btn btn-primary"><i class="fas fa-save"></i> Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeForm;
