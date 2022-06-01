import React from 'react'
import {Outlet} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from "react-bootstrap/Navbar"
import Col from 'react-bootstrap/Col'
import {Nav} from 'react-bootstrap'

function UnAuthApp() {
    return (
    <Container fluid>
        <Row>
            <Col> 
                <Navbar bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="/">I Need An Adult</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="loginPage">Login</Nav.Link>
                                <Nav.Link href="createAccountPage">Create account</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Col>
        </Row>
        <Outlet />
    </Container>
    );
}

export default UnAuthApp