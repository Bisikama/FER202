import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router'

export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Nav.Link as={Link} to="/link">Link</Nav.Link>
            <Nav.Link as={Link} to="/all-lessons">All Lessons</Nav.Link>
            <Nav.Link as={Link} to="/completed-lessons">Completed Lessons</Nav.Link> 
            <Nav.Link as={Link} to="/add-lessons">Add Lessons</Nav.Link>
            <Link to="/detail/:id">Detail</Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
