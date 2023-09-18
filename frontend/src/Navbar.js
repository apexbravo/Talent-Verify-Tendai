import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink

const AppNavbar = () => {
  return (
    <Navbar expand="lg" bg="white" variant="light" fixed="top" className="position-fixed shadow">
      <Container className="text-center justify-content-center">
        <Navbar.Brand href="../Index.html">
          <span id="nav-brand" className="d-none d-lg-inline">
            Talent Verify
          </span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Use NavLink components for navigation links */}
            <Nav.Link as={NavLink} to="/" exact activeClassName="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ImportEmployees" activeClassName="active">
              Import Employees
            </Nav.Link>
            <Nav.Link as={NavLink} to="/AddEmployeeForm" activeClassName="active">
              Add Manually Employees
            </Nav.Link>
            <Nav.Link as={NavLink} to="/EmployeeList" activeClassName="active">
              All Employees
            </Nav.Link>
            {/* Add more Nav.Link components for other pages */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
