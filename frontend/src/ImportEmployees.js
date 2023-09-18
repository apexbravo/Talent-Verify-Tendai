import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppNavbar from './Navbar';
function ImportEmployees() {
  const navigate = useNavigate();
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    try {
      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append('file', file);

      // Send the FormData to your Django backend
      const response = await axios.post('http://127.0.0.1:8000/api/upload-employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response (show a success message)
      console.log('File uploaded successfully:', response.data);
      navigate('/EmployeeList');
    } catch (error) {
      console.error('Error uploading file:', error);
      navigate('/EmployeeList');
      // Handle errors here.
    }
  }, [navigate]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx', // Specify the allowed file type(s)
  });

  return (

    <div>
      <AppNavbar />
      <div className=' container mt-5'>
        <h1 className='mt-5'>Import Employees</h1>
        <p className='bold'>You excel File should be in the following format</p>
        <table className="table  table-striped table-hover table-sm">
          <thead>
            <tr>

              <th scope="col">Name</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Department</th>
              <th scope="col">Role</th>
              <th scope="col">Date Started</th>
              <th scope="col">Date Left</th>
              <th scope="col">Duties</th>
            </tr>
          </thead>
        </table>

        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop an Excel file here, or click to select one</p>
        </div>
      </div>

    </div>
  );
}

export default ImportEmployees;
