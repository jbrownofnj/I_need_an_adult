import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker"

function ChangeEventModal({loggedInUser,onDeleteEventHandler,onUpdateEventHandler,show,setShow,handleClose,handleShow,selectedEvent,setSelectedEvent}) {

    function onChangeModalHandler(e){
        setSelectedEvent({...selectedEvent, [e.target.id]: e.target.value})
  
    }
  
    function validateUpdateEventForm() {
        return (selectedEvent.title.length > 0 && selectedEvent.start && selectedEvent.end)
    }
    function onChangePrivateSelector(e){
      console.log(selectedEvent)
      console.log(selectedEvent.private)
   
      setSelectedEvent({...selectedEvent,"private":!selectedEvent.private})
    }
 

    return (
      <>
        <Modal autoComplete="nope" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}{selectedEvent.userEmail===loggedInUser.userEmail?<></>:`--event by user:${selectedEvent.eventUser}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form autoComplete="nope">
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control disabled={selectedEvent.userEmail===loggedInUser.userEmail?false:true} autoComplete="nope" value={selectedEvent.title} onChange={onChangeModalHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="eventLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control disabled={selectedEvent.userEmail===loggedInUser.userEmail?false:true} type="text"  value={selectedEvent.eventLocation} onChange={onChangeModalHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="eventContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control disabled={selectedEvent.userEmail===loggedInUser.userEmail?false:true} type="text"  value={selectedEvent.eventContact} onChange={onChangeModalHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="eventDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control disabled={selectedEvent.userEmail===loggedInUser.userEmail?false:true} type="text"  value={selectedEvent.eventDescription} onChange={onChangeModalHandler}/>
                </Form.Group>
              
                <DatePicker disabled={selectedEvent.userEmail===loggedInUser.userEmail?false:true} showTimeSelect placeholderText="Start Date" selected={selectedEvent.start} onChange={(start) => setSelectedEvent({ ...selectedEvent, start })} />
                <DatePicker disabled={selectedEvent.userEmail===loggedInUser.userEmail?false:true} showTimeSelect placeholderText="End Date" selected={selectedEvent.end} onChange={(end) => setSelectedEvent({ ...selectedEvent, end })} />
                {selectedEvent.userEmail===loggedInUser.userEmail?<Button variant="primary" type="submit" onClick={onUpdateEventHandler} disabled={!validateUpdateEventForm()}>Save Changes</Button>:<></>}
                {selectedEvent.userEmail===loggedInUser.userEmail?<Button variant="danger" type="submit" onClick={onDeleteEventHandler}>Delete</Button>:<></>}
                {selectedEvent.userEmail===loggedInUser.userEmail? <Form.Check type="checkbox" onChange={onChangePrivateSelector} checked={selectedEvent.private} id="private" label="Private?"/>:<></>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  
}

export default ChangeEventModal