import React from 'react'
import {useState,useEffect} from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import App from "../App"
import UnAuthApp from "./UnAuthApp"
import CreateAccountPage from './CreateAccountPage'
import LoginPage from "./LoginPage"
import TaskPage from './TaskPage'
import CalendarPage from './CalendarPage'

function Router() {

  const [authChecked,setAuthChecked]=useState(true)
  const [loggedInUser,setLoggedInUser]=useState({})
  
  function handleSetLoggedInUser(user){
    console.log(user)
    setLoggedInUser(user)
  }
  
  function handleAuthCheck(){
    setAuthChecked(true);
  }

  useEffect(() => {
    fetch('api/me').then(res => {if (res.ok) {
                                res.json().then((user) => {
                                  setLoggedInUser(user)
                                  handleAuthCheck()})
                              } 
                              else {
                                setAuthChecked(false)
                              }
                      })
  }, [])
  if(authChecked) {
  return (
      <>  
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App handleSetLoggedInUser={handleSetLoggedInUser} loggedInUser={loggedInUser} setAuthChecked={setAuthChecked}/>}>
                  <Route path="tasksPage" element={<TaskPage/>}/>
                  <Route path="loginPage" element={<LoginPage handleAuthCheck={handleAuthCheck} handleSetLoggedInUser={handleSetLoggedInUser}/>}/>
                  <Route path="calendarPage" element={<CalendarPage loggedInUser={loggedInUser}/>}/>
                  <Route path="createAccountPage" element={<CreateAccountPage/>}/>
                  <Route index element={<CalendarPage loggedInUser={loggedInUser}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
      </>
    )}
      return (<>
      <BrowserRouter>
            <Routes>
                <Route path="/*" element={<UnAuthApp/>}>
                    <Route path="loginPage" element={<LoginPage handleAuthCheck={handleAuthCheck} handleSetLoggedInUser={handleSetLoggedInUser}/>}/>
                    <Route path="createAccountPage" element={<CreateAccountPage/>}/>
                    <Route index element={<LoginPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </>
      )
    
}

export default Router