import React from "react";
import {useState} from 'react'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"

function LoginPage({handleAuthCheck,handleSetLoggedInUser}) {

  const [password, setPassword] = useState("");
  const [email,setEmail]= useState("");
  const [emailValidated, setEmailValidated] = useState(false);
  const [emailValidatedOnce, setEmailValidatedOnce] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [passwordValidatedOnce, setPasswordValidatedOnce] = useState(false);
  const [invalidAttemptPerformed,setInvalidAttemptPerformed]=useState(false);
  const [serverError,setServerError]=useState("");

  function ValidateEmail(currentEmail){
    // eslint-disable-next-line
    return String(currentEmail).toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)!=null;
  }
  function ValidatePassword(currentPassword){
    // eslint-disable-next-line
    return String(currentPassword).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)!=null;
  }

  function handleInvalidAttempt(){
    setInvalidAttemptPerformed(true)
  }

  function handleEmailOnChange(e){
    setEmail(e.target.value) 
    const isValid=ValidateEmail(e.target.value)
    console.log(isValid)
    setEmailValidated(isValid)
    if (!emailValidatedOnce && isValid){
      setEmailValidatedOnce(true)
    }
  }

  function handlePasswordOnChange(e){
    setPassword(e.target.value)
    const isValid=ValidatePassword(e.target.value)
    setPasswordValidated(isValid)
    if(!passwordValidatedOnce&&isValid){
      setPasswordValidatedOnce(true)
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    if (passwordValidated && emailValidated){
      fetch("api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email, password:password})}
      ).then(res => {
        if (res.ok) {
          res.json().then((result) => {
            handleAuthCheck()
            handleSetLoggedInUser(result)
          })
        } else {
          res.json().then(errors => {
            setServerError(errors.errors)
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
              isInvalid={emailValidatedOnce||invalidAttemptPerformed?!emailValidated:null}
              isValid={emailValidatedOnce||invalidAttemptPerformed?emailValidated:null}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid gmail account.</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          
          </Form.Group><br/>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label><br/>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordOnChange}
              isInvalid={passwordValidatedOnce||invalidAttemptPerformed?!passwordValidated:null}
              isValid={passwordValidatedOnce||invalidAttemptPerformed?passwordValidated:null}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Looks secure!</Form.Control.Feedback>
          </Form.Group><br/>
          {serverError?<>
            <Form.Group>
              <Alert key="danger" danger="danger">
                The following error has occured: {serverError}
              </Alert>
            </Form.Group><br/></>:<></>}
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