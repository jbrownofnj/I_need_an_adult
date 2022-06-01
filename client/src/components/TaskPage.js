import Col from 'react-bootstrap/Col'
import TaskCard from "./TaskCard"
import Row from 'react-bootstrap/Row'
import {useEffect,useState} from 'react'
import Container from "react-bootstrap/Container"
import CreateTaskModal from './CreateTaskModal'
import Form from "react-bootstrap/Form"

function TaskPage({setUser,isLoggedIn,setIsLoggedIn}) {
 
  const [userTasks=[],setUserTasks]=useState([])
  const[newTask,setNewTask]=useState({newTaskName:"", newTaskDescription:"",newTaskContact:"", newTaskLocation:"", newTaskDuration:0,newTaskDueDate:""})
  const[filterByTime,setFilterByTime]=useState(false)
 
  function sorterFunction(a,b){
    if (filterByTime)
      {return( new Date(a.taskDueDate)-new Date(b.taskDueDate))}
    else
    {
      let aTotal=a.taskDuration
      let bTotal=b.taskDuration
      a.prereq_tasks.forEach((prereqObject)=>{aTotal+=prereqObject.taskDuration})
      b.prereq_tasks.forEach((prereqObject)=>{bTotal+=prereqObject.taskDuration})
      return (bTotal-aTotal)
    }
  }
  function taskMapper(oneTask){
    return(
    <Col key={oneTask.id}>
      <TaskCard  userTasks={userTasks} key={`${oneTask.id}+${1}`} prereqTask={oneTask.prereq_tasks} id={oneTask.id} taskName={oneTask.taskName} taskDescription={oneTask.taskDescription} taskDueDate={oneTask.taskDueDate} taskContact={oneTask.taskContact} taskLocation={oneTask.taskLocation} taskDuration={oneTask.taskDuration} completeTaskHandler={completeTaskHandler}/>
    </Col>)
  }
  function onChangeFilterHandler(e){
    setFilterByTime(filterByTime=>!filterByTime)
  }

  function completeTaskHandler(id,e){
    console.log(e)
    console.log(id)
    fetch(`api/completeTask/${id}`,
    {
      method:"DELETE",
    }).then(res=>res.json()).then(result=>{
      window.location.reload(false);
    })
  }

  useEffect(()=>
    {fetch("api/getUserTasks").then(res=>res.json()).then(result=>{
      setUserTasks([...result])
    })
 },[])

  return (
  <Container>
    <Col>
      <br/>
      <CreateTaskModal setNewTask={setNewTask} newTask={newTask}/>
    </Col>
    <br/>
    <Col>
        <Form>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label={filterByTime?"Filter By Due Date":"Filter By total duration"}
          onChange={onChangeFilterHandler}
        />
      </Form>
        <Row  xs={1} md={3} className="g-4">    
          {userTasks.length>0?userTasks.sort(sorterFunction).map(taskMapper):null}
        </Row> 
    </Col>  
    </Container>
  )
}

export default TaskPage