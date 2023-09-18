

import AppNavbar from './Navbar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes

import EmployeeList from './EmployeeList'; // Import your EmployeeList component
import ImportEmployees from './ImportEmployees'; // Import your ImportEmployees component
import AddEmployeeForm from './AddEmployeeForm'; // Import your AddEmployeeForm component
import Home from './Home';
import EmployeeDetails from './EmployeeDetails';
import EditEmployeeForm from './EditEmployee';
function App() {

  return (
    <Router> {/* Place the Router at the top level */}
      <div className="App">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ImportEmployees" element={<ImportEmployees />} />
          <Route path="/AddEmployeeForm" element={<AddEmployeeForm />} />
          <Route path="/EmployeeList" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/EmployeeEdit/:id" element={<EditEmployeeForm />} />
        </Routes>

      </div>
      <div>

      </div>

    </Router>

  );

}

export default App;


