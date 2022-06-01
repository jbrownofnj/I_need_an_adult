import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker"

function CreateTaskModal({setNewTask,newTask}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    function onChangeModalHandler(e){
      if (e.target.id==="newTaskDurationMinutes"||e.target.id==="newTaskDurationHours")
      {
        if(e.target.id==="newTaskDurationMinutes")
        {
          const currentDuration=newTask.newTaskDuration
          console.log(currentDuration)        
          const currentHours=Math.floor(currentDuration/60) 
          console.log(typeof currentHours)   
          let newMinutes=0
          if (e.target.value){
            newMinutes=parseInt(e.target.value)
          }
          console.log(typeof newMinutes) 
          const newTime=currentHours*60+newMinutes
          console.log(typeof newTime)
          setNewTask({...newTask, ["newTaskDuration"]: newTime})
        }
        if(e.target.id==="newTaskDurationHours")
        {
          const currentDuration=newTask.newTaskDuration   
          console.log(currentDuration)    
          const currentMinutes=currentDuration%60    
          console.log(currentMinutes) 
          let newHours=0
          if (e.target.value){
            newHours=parseInt(e.target.value)
          }
          console.log(newHours)
          const newTime=newHours*60+currentMinutes
          console.log(typeof newTime)
          setNewTask({...newTask, ["newTaskDuration"]: newTime})
        }
      }
      else{
        console.log(e)
        setNewTask({...newTask, [e.target.id]: e.target.value})
      }
  
        
    }
    function validateNewTask(){
        if(newTask.newTaskName){
          return true
        }
        else{
          return false
        }
    }
    function handleAddNewTask(e){
        console.log(newTask.newTaskDueDate)
        fetch('api/createUserTask',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({task_name:newTask.newTaskName,task_description:newTask.newTaskDescription,task_location:newTask.newTaskLocation,task_contact:newTask.newTaskContact,task_duration:newTask.newTaskDuration,task_due_date:`${new Date(newTask.newTaskDueDate)}`})
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            handleClose()
            window.location.reload(false);
        })
    }
    
 
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Task
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="newTaskName">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control autoComplete="nope" value={newTask.newTaskName} onChange={onChangeModalHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTaskDescription">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control autoComplete="nope" value={newTask.newTaskDescription} onChange={onChangeModalHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTaskLocation">
                    <Form.Label>Task Location</Form.Label>
                    <Form.Control autoComplete="nope" value={newTask.newTaskLocation} onChange={onChangeModalHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTaskContact">
                    <Form.Label>Task Contact</Form.Label>
                    <Form.Control autoComplete="nope" value={newTask.newTaskContact} onChange={onChangeModalHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Task Duration:</Form.Label>
                        <br/>Minutes
                    <Form.Control max={59} min={0} autoComplete="nope" type="number" id="newTaskDurationMinutes" value={newTask.newTaskDuration%60} onChange={onChangeModalHandler}/>
                    Hours
                    <Form.Control max={23} min={0} autoComplete="nope" type="number" id="newTaskDurationHours" value={Math.floor(newTask.newTaskDuration/60)} onChange={onChangeModalHandler}/>
                </Form.Group>
                <DatePicker placeholderText="Due Date" selected={newTask.newTaskDueDate} onChange={e=>setNewTask({...newTask, newTaskDueDate:e})}/>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" disabled={!(newTask.newTaskName)} onClick={handleAddNewTask}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


export default CreateTaskModal