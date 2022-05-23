import React from 'react'
import {Outlet,useNavigate} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from "react-bootstrap/Navbar"
import {Nav,NavDropdown} from 'react-bootstrap'

function App(setAuthCheck) {

  const navigate=useNavigate()
  
  function onClickLogoutHandler(e){
    console.log(e)
    fetch("/logout",{method:"DELETE"}).then(res=>res.json()).then(result=>{
      console.log(result)
      setAuthCheck(false)
      navigate("/", { replace: true });
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col> <Navbar bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand href="/">I Need An Adult</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="loginPage">Login</Nav.Link>
                  <Nav.Link href="createAccountPage">Create account</Nav.Link>
                  <NavDropdown title="Views" id="basic-nav-dropdown">
                    <NavDropdown.Item href="tasksPage">To Do List</NavDropdown.Item>
                    <NavDropdown.Item href="calendarPage">Calendar</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="loginPage" onClick={onClickLogoutHandler}>LogOut</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar></Col>
      </Row>
    
        <Outlet/>
   
    </Container>
  );
}

export default App;
