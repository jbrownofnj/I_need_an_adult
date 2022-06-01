import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'

export default function CreateAccountPage() {

  const [password, setPassword] = useState("");
  const [userName,setUserName]= useState("");
  const [userNameValidated, setUserNameValidated] = useState(false);
  const [userNameValidatedOnce, setUserNameValidatedOnce] = useState(false);
  const [userEmail,setUserEmail]= useState("");
  const [emailValidated, setEmailValidated] = useState(false);
  const [emailValidatedOnce, setEmailValidatedOnce] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [passwordValidatedOnce, setPasswordValidatedOnce] = useState(false);
  const [invalidAttemptPerformed,setInvalidAttemptPerformed]=useState(false);
  
  function validateForm() {
    if (userNameValidated && emailValidated && emailValidated)
    {return true}
    else
    {return false}
  }
  function ValidateEmail(currentEmail){
    // eslint-disable-next-line
    return String(currentEmail).toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)!=null;
  }
  function ValidatePassword(currentPassword){
    // eslint-disable-next-line
    return String(currentPassword).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)!=null;
  }
  function ValidateUserName(currentUserName){
    if(currentUserName.length>5)
      {return true}
    else
      {return false}
  }
  function handleInvalidAttempt(){
    setInvalidAttemptPerformed(true)
  }
  function handleUserNameChange(e){
    setUserName(e.target.value)
    const isValid=ValidateUserName(e.target.value)
    
    setUserNameValidated(isValid)
    if (!userNameValidatedOnce && isValid){
      setUserNameValidatedOnce(true)
    }
  }
  
  function handleEmailOnChange(e){
    setUserEmail(e.target.value) 
    const isValid=ValidateEmail(e.target.value)
    
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
    event.preventDefault()
    const createThisUser={user_name:userName, color_coefficient:1, user_email:userEmail, password:password}
    fetch("api/createUser",{
      method:"POST",
      headers:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify(createThisUser)
    }).then(res=> {if (res.ok)
                  {
                    res.json().then(postedUser=>{
                        event.preventDefault()
                        console.log(postedUser)
                    })
                  }
                  else{
                    
                    console.log("failed result from createUser")
                  }})
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
            onChange={handleUserNameChange}
            isInvalid={userNameValidatedOnce||invalidAttemptPerformed?!userNameValidated:null}
              isValid={userNameValidatedOnce||invalidAttemptPerformed?userNameValidated:null}
          />
        </Form.Group><br/>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
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
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={userEmail}
            onChange={handleEmailOnChange}
            isInvalid={emailValidatedOnce||invalidAttemptPerformed?!emailValidated:null}
            isValid={emailValidatedOnce||invalidAttemptPerformed?emailValidated:null}
          />
            <Form.Control.Feedback type="invalid">Please provide a valid gmail account.</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        </Form.Group><br/>
        <Button size="lg" type="submit" disabled={!validateForm()}>
          Create Account
        </Button>
      </Form>
    </div>
    </Container>
   
   
    </Row>
  );
}