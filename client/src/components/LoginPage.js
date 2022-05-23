import React from "react";
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginPage({handleSetLoggedInUser}) {

  const [password, setPassword] = useState("");
  const [email,setEmail]= useState("");
  const [emailValidated, setEmailValidated] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [invalidAttemptPerformed,setInvalidAttemptPerformed]=useState(false)

  function minimumEmailDataSupplied(){
    return email.length>6
  }

  function minimumPasswordDataSupplied(){
    return password.length>6
  }

  function ValidateEmail(currentEmail){
    //RFC 2822 standard email validation
    console.log(currentEmail)
    const testedEmail=String(currentEmail).toLowerCase()
    console.log(testedEmail)
    const matchTest=testedEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)!=null;
    console.log(matchTest)
    return matchTest
  }

  function handleInvalidAttempt(){
    setInvalidAttemptPerformed(true)
  }

  function handleEmailOnChange(e){
    setEmail(e.target.value) 
    const isValid=ValidateEmail(e.target.value)
    console.log(isValid)
    setEmailValidated(isValid)
  }

  function handlePasswordOnChange(e){
    setPassword(e.target.value)
  }

  function handleSubmit(event) {
    const loginForm=event.currentTarget
    if (loginForm.checkValidity()){
      fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email, password:password})}
      ).then(res => {
        if (res.ok) {
          res.json().then(() => {
          
          })
        } else {
          res.json().then(errors => {
            console.log(errors)
            event.preventDefault();
            event.stopPropagation();
            //add a login error on the screen
  
          })
        }
      })
    }
    else{
      handleInvalidAttempt()
      event.preventDefault();
      event.stopPropagation();
    }
}

  return (<Row xs={3} md={3} className="g-4">
    <Container fluid><br/><br/><br/><br/><br/>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>User Email</Form.Label>
            <Form.Control
              autoFocus
              placeholder="User Gmail Account"
              type="email"
              value={email}
              onChange={handleEmailOnChange}
              isInvalid={invalidAttemptPerformed||minimumEmailDataSupplied()?!emailValidated:null}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid gmail.</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          
          </Form.Group><br/>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordOnChange}
              isInvalid={invalidAttemptPerformed||minimumPasswordDataSupplied()?!passwordValidated:null}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid gmail.</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          </Form.Group><br/>
          <Button block size="lg" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
   
   
    </Row>
  );
}
export default LoginPage