import React from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useState} from "react"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

function CoplannerPage({loggedInUser,handleSetLoggedInUser}) {
    const [show, setShow] = useState(false);
    const handleClose = () => {setEmailValidatedOnce(false); setShow(false)};
    const handleShow = () => setShow(true);
    const [coplannerEmail,setComplannerEmail]=useState("")
    const [emailValidatedOnce,setEmailValidatedOnce]=useState(false)
    const [emailValidated,setEmailValidated]=useState(false)
    
    
    function ValidateEmail(currentEmail){
        // eslint-disable-next-line
        return String(currentEmail).toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)!=null;
    }
    function onChangeCoplannerEmail(e){
        setComplannerEmail(e.target.value)
        const isValid=ValidateEmail(e.target.value)
        console.log(isValid)
        setEmailValidated(isValid)
        if (!emailValidatedOnce && isValid){
          setEmailValidatedOnce(true)
        }
    }
    function handleNewCoplannerClick(e){
      handleShow()
    }
    function handleSubitnewCoplannner(e)
    { handleClose()
        fetch("api/requestCoplanner",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({shower_email:coplannerEmail})}
        ).then(res => {
            if (res.ok) {
                res.json().then((result) => {
                    console.log(result)
                    window.location.reload(false);
                })
            } else {
                res.json().then(errors => {
                    })
            }
        })
    }
    
    function handleClickRemoveShower(e,userEmail){
        fetch("api/deleteShowerCoplanner",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userEmail:`${userEmail}`})
        }).then(res=>{
            if (res.ok)
            {res.json().then(result=>{
                window.location.reload(false);
            })}
            else
            {console.log(res.errors)}
        })
    }

    function handleClickRemoveViewer(e,userEmail){
        fetch("api/deleteViewerCoplanner",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userEmail:`${userEmail}`})
        }).then(res=>{
            if (res.ok)
            {res.json().then(result=>{
                console.log(result)
                window.location.reload(false);
            })}
            else
            {console.log(res.errors)}
        })
    }  

    function userShowerMapper(userShowerObject){
        return (
            <Card key={`${userShowerObject.userEmail} ${1}`}>  
                <Card.Body key={`${userShowerObject.userEmail} ${2}`}>
                    <Card.Title key={`${userShowerObject.userEmail} ${3}`}>
                        {`${userShowerObject.userName}`} <br></br></Card.Title>
                    <Card.Text key={`${userShowerObject.userEmail} ${4}`}>
                        User Email: {`${userShowerObject.userEmail}`} 
                    </Card.Text>
                <Button key={`${userShowerObject.userEmail}${5}`} onClick={e=>handleClickRemoveShower(e,userShowerObject.userEmail)}>Remove</Button>
                </Card.Body>
            </Card>
        )
    }

    function userViewerMapper(userViewerObject){
        return (
            <Card key={`${userViewerObject.userEmail}${1}`}>  
            <Card.Body key={`${userViewerObject.userEmail}${2}`}>
            <Card.Title key={`${userViewerObject.userEmail}${3}`}>{`${userViewerObject.userName}`}</Card.Title>
            <Card.Text key={`${userViewerObject.userEmail}${4}`}>
            User Email: {`${userViewerObject.userEmail}`} 
            </Card.Text>
            <Button key={`${userViewerObject.userEmail}${5}`} onClick={e=>handleClickRemoveViewer(e,userViewerObject.userEmail)}>Remove</Button>
            </Card.Body>
            </Card>
        )
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New View Permission Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please enter the email of the user who's events you would like to see. The events will be available
                to you when the individual verifies the request in their email.</Modal.Body>
                <Modal.Body>
                <Form>
                    <Form.Label>User Email:</Form.Label>
                    <Form.Control autoFocus placeholder="User Gmail Account" type="email" value={coplannerEmail} onChange={onChangeCoplannerEmail}
                        isInvalid={emailValidatedOnce?!emailValidated:null}
                        isValid={emailValidatedOnce?emailValidated:null}
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid gmail account.</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Valid Email!</Form.Control.Feedback>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubitnewCoplannner}>
                    Make Request
                </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs lg="2"></Col>
                    <Col md="auto">
                    <br/>
                        <Card>
                            <Card.Body>
                                <Card.Title>COPLANNERS CURRENTLY VIEWABLE</Card.Title>
                                <br></br>
                                <Card.Title>User: {`${loggedInUser.userName}`}</Card.Title>
                                <Card.Text>
                                    The following are the users who's events you have access to:
                                </Card.Text>
                                {!loggedInUser.userViewerCoplanners||loggedInUser.userViewerCoplanners.length===0?<Card.Text>No one can currently see your events</Card.Text>:loggedInUser.userViewerCoplanners.map(userViewerMapper)}
                            </Card.Body>
                            <Button onClick={handleNewCoplannerClick}>Request New View Permission</Button>
                        </Card>
                        <br></br>
                        <Card>
                            <Card.Body>
                                <Card.Title>COPLANNERS CURRENTLY VIEWING YOU</Card.Title>
                                <br></br>
                                <Card.Text>
                                    The following are the users who have access to your events:
                                </Card.Text>
                                {!loggedInUser.userShowerCoplanners||loggedInUser.userViewerCoplanners.length===0?<Card.Text>No one can currently see your events</Card.Text>:loggedInUser.userShowerCoplanners.map(userShowerMapper)}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs lg="2"></Col>
                </Row>
            </Container>
        </>
    )
}

export default CoplannerPage