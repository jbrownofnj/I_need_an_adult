import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'

export default function CreateAccountPage() {

  const [password, setPassword] = useState("");
  const [userName,setUserName]= useState("");
  const [userEmail,setUserEmail]= useState("");
  
  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const createThisUser={user_name:userName, color_coefficient:1, user_email:userEmail, password:password}
    fetch("/createUser",{
      method:"POST",
      headers:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify(createThisUser)
    }
    ).then(res=>res.json()).then(postedUser=>{
      window.location.reload(false);
    })
  }

  return (<Row xs={3} md={3} className="g-4">
     <Container fluid><br/><br/><br/><br/><br/>
    <div className="Login">
      <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group><br/>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group><br/>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group><br/>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Create Account
        </Button>
      </Form>
    </div>
    </Container>
   
   
    </Row>
  );
}