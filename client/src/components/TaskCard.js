import React from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import CloseButton from "react-bootstrap/CloseButton"
import Dropdown from "react-bootstrap/Dropdown"


function TaskCard({userTasks, id, prereqTask=[], taskName="N/A",taskDescription="N/A",taskLocation="N/A",taskContact="N/A",taskDuration="N/A",taskDueDate=null,completeTaskHandler}) {

  const hasPrereqs=prereqTask.length===0?false:true

  function onClickDeletePrereq(e,aPrereqTask){
    fetch(`/deleteUserPrereq/${aPrereqTask.id}`,{method:"DELETE"}).then(res=>res.json()).then(result=>{
      window.location.reload(false);
      console.log(result)
    })
  }

  function prereqMapper(aPrereqTask){
    return(<> <span key={aPrereqTask.id}>
     {aPrereqTask.taskName}
    </span> <CloseButton onClick={e=>{onClickDeletePrereq(e,aPrereqTask)}}/></>)
  }

  function handleOnClickAddPrereq(e,id){
    console.log("prereq id is"+e)
    fetch("/createUserPrereq",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({task_id:id,required_task_id:e})
    }).then(res=>res.json()).then(result=>{
      console.log(result)
      window.location.reload(false);
    })
  }

  function dropdownMapper(aUserTask){
    return(<Dropdown.Item eventKey={aUserTask.id} >{`${aUserTask.taskName}`}</Dropdown.Item>)
  }

  return (
    <Card>
    <Card.Body>
      <Card.Title>{taskName}</Card.Title>
      <Card.Text>
        Description: {taskDescription}
      </Card.Text>
      </Card.Body>
      <Card.Body>
      <Card.Text>
        Location: {taskLocation}
      </Card.Text>
      <Card.Text>
        Contact: {taskContact}
      </Card.Text>
      <Card.Text>
      Duration: {taskDuration}
      </Card.Text>
      <Card.Text>
        Due: {taskDueDate}
      </Card.Text>
      <Card.Text>
        Prereqs: {hasPrereqs?prereqTask.map(prereqMapper):"N/A"}<br></br>
        <Dropdown onSelect={e=>handleOnClickAddPrereq(e,id)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            AddPrereq
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {userTasks.map(dropdownMapper)}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Text>
    </Card.Body>
    {hasPrereqs?<Button disabled>Must Finish Other Tasks</Button>:<Button as="input" type="submit" value="Complete" onClick={e=>completeTaskHandler(id,e)}/>}
  </Card>
  )
}

export default TaskCard