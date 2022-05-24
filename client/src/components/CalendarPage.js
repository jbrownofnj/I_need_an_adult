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
import {useCallback} from "react"

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

const events = [
];

function CalendarPage() {

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" , eventDescription:"",eventLocation:"",eventContact:"" });
    const [allEvents, setAllEvents] = useState(events);
    const [selectedEvent, setSelectedEvent] = useState(undefined)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let initialRender=true;

    function validateNewEventForm() {
        return (newEvent.title.length > 0 && newEvent.start && newEvent.end && newEvent.start<newEvent.end)
    }

    useEffect(()=>{
        if(initialRender)
        {initialRender=false}
        else
        {fetch("api/getUserEvents").then(res=>res.json()).then(result=>{
            console.log(result)
            result.map((event)=>{
                const newCalendarEvent={title: `${event.eventName}`, start: new Date(event.eventStart), end: new Date(event.eventEnd), id:event.id, eventDescription:event.eventDescription, eventLocation:event.eventLocation,eventContact:event.eventContact}
                setAllEvents(allEvents=>[...allEvents, newCalendarEvent]);
                console.log(event)
            })
        })}
    },[])

    function onSelectedEvent(e){
        console.log(e)
        setSelectedEvent(e)
        handleShow()
    }

    function onUpdateEventHandler(e){
        const preppedEvent={id:selectedEvent.id, event_name:selectedEvent.title,event_description: selectedEvent.eventDescription,event_location: selectedEvent.eventLocation,event_contact:selectedEvent.eventContact,event_start:selectedEvent.start,event_end:selectedEvent.end}
       console.log(preppedEvent)
       fetch(`api/updateUserEvent`,{method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(preppedEvent)}).then(res=>res.json()).then(result=>{
           console.log(result)
           handleClose()
           
        })

    }

    function onDeleteEventHandler(e){
        fetch(`api/destroyUserEvent/${selectedEvent.id}`,{method:"DELETE"}).then(res=>res.json()).then(result=>{
            console.log(result)
            handleClose()
        })
    }

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        fetch('api/addUserEvent',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({event_name:newEvent.title,event_start: `${new Date(newEvent.start)}`,event_end: `${new Date(newEvent.end)}`,event_description:newEvent.eventDescription, event_location:newEvent.eventLocation, event_contact:newEvent.eventContact})
        }).then(res=>res.json()).then(result=>{
            console.log(result)
        })
    }
    function eventPropGetter(event,start,end,isSelected){
        console.log(event);
        const color=event.title==="Beach Weekend"? "red":"green"
    var style = {
        backgroundColor: color,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
    }

    return (
        <Row>
            <Col xs={2}>
            <div style={{borderStyle:"double", width:"110%", height:"100%"}}>
                <h1>Calendar</h1>
                <h2>Add New Event</h2>
                <input type="text" placeholder="Add Event Name" style={{ width: "100%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker showTimeSelect placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker showTimeSelect placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
               
                <input type="text" maxLength="400" placeholder="Add Event Description" style={{ height:"15%",width: "100%", marginRight: "10px" }} value={newEvent.eventDescription} onChange={(e) => setNewEvent({ ...newEvent, eventDescription: e.target.value })} />
                <input type="text" placeholder="Add Event Location" style={{ width: "100%", marginRight: "10px" }} value={newEvent.eventLocation} onChange={(e) => setNewEvent({ ...newEvent, eventLocation: e.target.value })} />
                <input type="text" placeholder="Add Event Contact" style={{ width: "100%", marginRight: "10px" }} value={newEvent.eventContact} onChange={(e) => setNewEvent({ ...newEvent, eventContact: e.target.value })} />
                <button stlye={{ marginTop: "10px" }} type="submit" disabled={!validateNewEventForm()}onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
                {selectedEvent && <ChangeEventModal onDeleteEventHandler={onDeleteEventHandler} onUpdateEventHandler={onUpdateEventHandler} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}/>}
            </Col>
            <Col xs={9}>
                <div style={{borderStyle:"double", width:"110%", height:"100%"}}>
                <Calendar eventPropGetter={eventPropGetter} onSelectEvent = {onSelectedEvent} localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 750, margin: "50px" }} />
                </div>
            </Col>
        </Row>
    );
}

export default CalendarPage;