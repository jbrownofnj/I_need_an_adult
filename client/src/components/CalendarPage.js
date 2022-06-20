import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState,useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ChangeEventModal from "./ChangeEventModal";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown"


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function CalendarPage() {
    const [loggedInUser,setLoggedInUser]=useState({})
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" , eventDescription:"",eventLocation:"",eventContact:"" });
    const [allEvents, setAllEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(undefined)
    const [viewerCoplanners,setViewerCoplanners]=useState([])
    const [show, setShow] = useState(false);
    const [showerUserColorPairs,setShowerUserColorPairs]=useState({"none":"fake"})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const colorPool=["Disable","FireBrick","Orange","Gold","ForestGreen","SkyBlue","Purple"]
    let initialRender=true
   
      
    
    useEffect(()=>{
        if (initialRender)
        // eslint-disable-next-line
            {initialRender=false}
        else
            {
            fetch('api/me').then(res => {if (res.ok) {
                res.json().then((user) => {
                    setLoggedInUser(user)
                    setShowerUserColorPairs({...showerUserColorPairs,[user.userEmail]:"#3174ad"})
                    })
                } 
                else {
                    
                }
            })

            fetch("api/getUserEvents").then(res=>{
                if(res.ok){
                    res.json().then(result=>{
                        result.forEach((event)=>{
                            console.log(event)
                            const newCalendarEvent={title: `${event.eventName}`, userEmail:event.userEmail, eventUser:event.eventUser, private:event.private, start: new Date(event.eventStart), end: new Date(event.eventEnd), id:event.id, eventDescription:event.eventDescription, eventLocation:event.eventLocation, eventContact:event.eventContact}
                            setAllEvents(allEvents=>[...allEvents, newCalendarEvent]);
                        })
                    })
                }
                else
                {
                    console.log(res)
                }
            
            })

            fetch("api/getCoplannerUsers").then(res=>res.json()).then(result=>{
                result.forEach((coplanner)=>{
                    const newCoplanner={userName:coplanner.user_name, userEmail:coplanner.user_email}
                    setViewerCoplanners(viewerCoplanners=>[...viewerCoplanners, newCoplanner]);
                })
            })
            fetch("api/getCoplannerEvents").then(res=>res.json()).then(result=>{
                result.forEach((resultObject)=>{
                    resultObject.coplannerEvents.forEach((event)=>{
                        const newCoplannerCalendarEvent={title: `${event.eventName}`,userEmail:event.userEmail, eventUser:event.eventUser, private:event.private,start: new Date(event.eventStart), end: new Date(event.eventEnd), id:event.id, eventDescription:event.eventDescription, eventLocation:event.eventLocation, eventContact:event.eventContact}
                        setAllEvents(allEvents=>[...allEvents, newCoplannerCalendarEvent])
                    })
                })
            })
            }})
    function handleOnClickColorSelect(e,showerUser,colorPool,aColor){
        if (aColor!=="Disable"){
        setShowerUserColorPairs(showerUserColorPairs=>{return{...showerUserColorPairs,[showerUser.userEmail]:aColor}})
        }
        else{
        setShowerUserColorPairs(showerUserColorPairs=>{
            const copy={...showerUserColorPairs}
            delete copy[showerUser.userEmail]
            return copy
        })
        }
    }
    function variantChooser(showerUser,showerUserColorPairs){
        
        const foundUser=Object.keys(showerUserColorPairs).includes(showerUser.userEmail)
        if(foundUser){
                const theUserEmail=showerUser.userEmail
                
            return(showerUserColorPairs[theUserEmail])
        }
        else{
            return("unselected")
        }
    }
    function colorDropdownMapper(showerUser,aColorArray){
        
            return(
                <Dropdown key={showerUser.userEmail} id={showerUser.userEmail}>
                <style  type="text/css">{`.btn-unselected {background-color: white; color: darkgrey`}</style>
                <style  type="text/css">{`.btn-FireBrick {background-color: FireBrick; color: white; border:solid; border-color:#671414}`}</style>
                <style  type="text/css">{`.btn-Orange {background-color: Orange; color: black; border:solid; border-color:#8F5D00}`}</style>
                <style  type="text/css">{`.btn-Gold {background-color:Gold; color: black; border:solid; border-color:#8F7900}`}</style>
                <style  type="text/css">{`.btn-ForestGreen {background-color:ForestGreen; color: white; border:solid; border-color:#145214}`}</style>
                <style  type="text/css">{`.btn-SkyBlue {background-color: skyblue; color: black; border:solid; border-color:#155D7A}}`}</style>
                <style  type="text/css">{`.btn-Purple {background-color: Purple; color: white; border:solid; border-color:#3D003D}`}</style>
                    <Dropdown.Toggle   variant={variantChooser(showerUser,showerUserColorPairs)}>
                        {showerUser.userEmail}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                    {aColorArray.map((aColor)=>{
                        if(!Object.values(showerUserColorPairs).includes(aColor))
                            {
                                
                                return(<Dropdown.Item key={`${aColor}-${showerUser.userEmail}`} onClick={e=>handleOnClickColorSelect(e,showerUser,aColorArray,aColor)} style={{color:(aColor==="SkyBlue"||aColor==="Orange"||aColor==="Gold"||aColor==="Disable")?"black":"#fff",backgroundColor:`${aColor}`,border:"1px solid black"}}  value={`${aColor}`}>{aColor}</Dropdown.Item>)
                            }      
                        else
                        {
                        }                  
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                
            )
    }
    function validateNewEventForm() {
        return (newEvent.title.length > 0 && newEvent.start && newEvent.end && newEvent.start<newEvent.end)
    }

    function onSelectedEvent(e){
        setSelectedEvent(e)
        handleShow()
    }

    function onUpdateEventHandler(e){
        const preppedEvent={id:selectedEvent.id, event_name:selectedEvent.title,private:selectedEvent.private,event_description: selectedEvent.eventDescription,event_location: selectedEvent.eventLocation,event_contact:selectedEvent.eventContact,event_start:selectedEvent.start,event_end:selectedEvent.end}
        console.log(preppedEvent)
        fetch(`api/updateUserEvent`,{method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(preppedEvent)}).then(res=>res.json()).then(result=>{
            handleClose() 
        })
    }
    
    function onDeleteEventHandler(e){
        fetch(`api/destroyUserEvent/${selectedEvent.id}`,{method:"DELETE"}).then(res=>res.json()).then(result=>{
            
            handleClose()
        })
    }

    function handleAddEvent(e) {
        e.preventDefault()
        console.log(e)
        
        fetch('api/addUserEvent',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({event_name:newEvent.title,event_start: `${new Date(newEvent.start)}`,event_end: `${new Date(newEvent.end)}`,event_description:newEvent.eventDescription, event_location:newEvent.eventLocation, event_contact:newEvent.eventContact})
        }).then(res=>{
            if(res.ok)
            {
            res.json().then((result)=>{
                console.log(result.eventName)
                console.log(newEvent.title)
                if (result.eventName===newEvent.title)
                {
                    console.log("ping")
                    setAllEvents([...allEvents, newEvent]);}
                    window.location.reload();
            })
            }
            else
            {
                console.log(res)
            }
        })
    }

    function eventPropGetter(event){
        const theUserEmail=event.userEmail
        const eventHasColor=showerUserColorPairs.hasOwnProperty(theUserEmail)
        const chosenColor=eventHasColor?showerUserColorPairs[theUserEmail]:"black"
        const lettersColor=(chosenColor==="SkyBlue"||chosenColor==="Orange"||chosenColor==="Gold")?"black":"#fff"
        const backColor=event.userEmail===loggedInUser.userEmail? "#3174ad":`${chosenColor}`
        const style = {
            border: 'none',
            boxSizing: "border-box",
            boxShadow: "none",
            margin: "0",
            padding: "2px 5px",
            backgroundColor: backColor,
            borderRadius: "5px",
            color: lettersColor,
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
        };
    return {
        style: style
    };
    }
    return (
        <Row>
            {selectedEvent && <ChangeEventModal loggedInUser={loggedInUser} onDeleteEventHandler={onDeleteEventHandler} onUpdateEventHandler={onUpdateEventHandler} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}/>}
            <Col xs={3}>
                <Row>
                    <Card><br></br>
                        <Card.Title>Calendar Add New Event</Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} value={newEvent.title} placeholder="Add Event Name" />
                                <style>
                                    {
                                    `.date-picker input {
                                        display: block;
                                        width: 100%;
                                        padding: 0.375rem 0.75rem;
                                        font-size: 1rem;
                                        font-weight: 400;
                                        line-height: 1.5;
                                        color: #212529;
                                        background-color: #fff;
                                        background-clip: padding-box;
                                        border: 1px solid #ced4da;
                                        appearance: none;
                                        border-radius: 0.25rem;
                                        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                                    }`
                                    }
                                </style>
                                <DatePicker wrapperClassName='date-picker' showTimeSelect placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                                <DatePicker wrapperClassName='date-picker' showTimeSelect placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                                <Form.Control maxLength="400" placeholder="Add Event Description" value={newEvent.eventDescription} onChange={(e) => setNewEvent({ ...newEvent, eventDescription: e.target.value })}/>
                                <Form.Control maxLength="400" placeholder="Add Event Location"  value={newEvent.eventLocation} onChange={(e) => setNewEvent({ ...newEvent, eventLocation: e.target.value })} />
                                <Form.Control maxLength="400" placeholder="Add Event Contact"  value={newEvent.eventContact} onChange={(e) => setNewEvent({ ...newEvent, eventContact: e.target.value })}  />
                                <br></br>
                                <Button type="submit" disabled={!validateNewEventForm()} onClick={handleAddEvent}>
                                    Add Event
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Title>
                            Coplanners:
                        </Card.Title>
                        
                        <Card.Body>
                        {typeof viewerCoplanners[0]==="object"?<Form>{viewerCoplanners.map((showerUser)=>colorDropdownMapper(showerUser,colorPool))}</Form>: <Card.Text>You do not currently have permissions to see any 
                        other users events</Card.Text>}
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            <Col xs={9}>
                <Calendar 
                    eventPropGetter={eventPropGetter}  
                    onSelectEvent = {onSelectedEvent} 
                    localizer={localizer} events={allEvents.filter((eachEvent)=>{
                        return(Object.keys(showerUserColorPairs).includes(eachEvent.userEmail))
                    })} 
                    startAccessor="start" 
                    endAccessor="end" 
                    style={{ height: 750, margin: "50px" }} />
            </Col>
        </Row>
    );
}

export default CalendarPage;