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
        console.log(e)
        setNewTask({...newTask, [e.target.id]: e.target.value})
        
    }
    function validateNewTask(){
        return(newTask.newTaskName)
    }
    function handleAddNewTask(e){
        console.log(newTask)
        fetch('/createUserTask',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({task_name:newTask.newTaskName,task_description:newTask.newTaskDescription,task_location:newTask.newTaskLocation,task_contact:newTask.newTaskContact,duration:newTask.newTaskDuration,task_due_date:`${new Date(newTask.taskDueDate)}`})
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
                <Form.Group className="mb-3" controlId="newTaskDuration">
                    <Form.Label>Task Duration in minutes</Form.Label>
                    <Form.Control autoComplete="nope" type="number" value={newTask.newTaskDuration} onChange={onChangeModalHandler}/>
                </Form.Group>
                <DatePicker placeholderText="Due Date" selected={newTask.newTaskDueDate} onChange={e=>setNewTask({...newTask, newTaskDueDate: e})} />
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" disable={validateNewTask()} onClick={handleAddNewTask}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


export default CreateTaskModal