import React from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import CloseButton from "react-bootstrap/CloseButton"
import Dropdown from "react-bootstrap/Dropdown"


function TaskCard({userTasks, id, prereqTask=[], taskName="N/A",taskDescription="N/A",taskLocation="N/A",taskContact="N/A",taskDuration=0,taskDueDate=null,completeTaskHandler}) {
  
  const hasPrereqs=prereqTask.length===0?false:true

  function onClickDeletePrereq(e,aPrereqTask){
    console.log(e)
    console.log(aPrereqTask)
    fetch(`api/deleteUserPrereq/${aPrereqTask.id}`,{method:"DELETE"}).then(res=>{
      if (res.ok)
        {res.json().then(result=>{
          window.location.reload(false);
        })}
    })
  }
  function prereqFilter(taskObject){
    const prereqIDs=prereqTask.map((taskObject)=>taskObject.id)
    if(prereqIDs.includes(taskObject.id))
      return false
    else  
      return true
  }

  function prereqMapper(aPrereqTask){
    return(<> <span key={`${aPrereqTask.id}span`}>
     {aPrereqTask.taskName}
    </span> <CloseButton key={`${aPrereqTask.id}closebutton`}  id={aPrereqTask.id} onClick={e=>{onClickDeletePrereq(e,aPrereqTask)}}/><br/></>)
  }
  
  function dropdownMapper(aUserTask){
    if(aUserTask.id!==id){
      return(<Dropdown.Item eventKey={aUserTask.id} id={aUserTask.id} key={aUserTask.id}> {`${aUserTask.taskName}`} </Dropdown.Item>)
    }
  }

  function handleOnClickAddPrereq(event,id){
    const taskThatNeedsPrereq=id
    const taskThatWillBePrereq=event
    fetch("api/createUserPrereq",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({independent_task_id:taskThatNeedsPrereq, prereq_task_id:taskThatWillBePrereq})
    }).then(res=>{
      if (res.ok)
        {res.json().then(result=>{
          window.location.reload(false);
        })}
    })
  }

 

  function durationCalculator(){
    let totalDuration=taskDuration
    prereqTask.forEach((task)=>{
      totalDuration=totalDuration+task.taskDuration
    })
    return totalDuration
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
      Duration: {taskDuration}{prereqTask.length>0? `  total: (${durationCalculator()})`:null}
      </Card.Text>
      <Card.Text>
        Due: {new Date(taskDueDate).toDateString()}
      </Card.Text>
      <Card.Text>
        Prereqs: <br/>{hasPrereqs?prereqTask.map(prereqMapper):"N/A"}<br></br>
      </Card.Text>
      <Dropdown onSelect={e=>handleOnClickAddPrereq(e,id)} >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            AddPrereq
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {userTasks.filter(prereqFilter).map(dropdownMapper)}
          </Dropdown.Menu>
        </Dropdown>
    </Card.Body>
    {hasPrereqs?<Button disabled>Must Finish Other Tasks</Button>:<Button as="input" type="submit" value="Complete" onClick={e=>completeTaskHandler(id,e)}/>}
  </Card>
  )
}

export default TaskCard