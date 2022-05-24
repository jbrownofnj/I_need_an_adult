import Col from 'react-bootstrap/Col'
import TaskCard from "./TaskCard"
import Row from 'react-bootstrap/Row'
import {useEffect,useState} from 'react'
import Container from "react-bootstrap/Container"
import CreateTaskModal from './CreateTaskModal'

function TaskPage({setUser,isLoggedIn,setIsLoggedIn}) {

  const [userTasks,setUserTasks]=useState([])
  const[newTask,setNewTask]=useState({newTaskName:"", newTaskDescritpion:"",newTaskContact:"", newTaskLocation:"", newTaskDuration:0,newTaskDueDate:""})
  
  function taskMapper(oneTask){
    return(
    <Col>
      <TaskCard  userTasks={userTasks} key={oneTask.id} prereqTask={oneTask.prereq_tasks} id={oneTask.id} taskName={oneTask.taskName} taskDescription={oneTask.taskDescription} taskDueDate={oneTask.taskDueDate} taskContact={oneTask.taskContact} taskDuration={oneTask.taskDuration} completeTaskHandler={completeTaskHandler}/>
    </Col>)
  }

  function completeTaskHandler(id,e){
    fetch(`api/completeTask/${id}`,
    {
      method:"DELETE",
    }).then(res=>res.json()).then(result=>{
      window.location.reload(false);
    })
  }

  useEffect(()=>
    {fetch("api/getUserTasks").then(res=>res.json()).then(result=>{
      console.log(result)
      setUserTasks([...result])
    })
 },[])
 
 
  return (<Container>
  <Col>
  <br/>
    <CreateTaskModal setNewTask={setNewTask} newTask={newTask}/>
  </Col>
  <br/>
  <Col>
      <Row  xs={1} md={3} className="g-4">    
        {userTasks.map(taskMapper)}
      </Row> 
  </Col>  
  </Container>
  )
}

export default TaskPage