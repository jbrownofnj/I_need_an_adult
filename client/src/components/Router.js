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
    fetch("/cheese")
    fetch('/me').then(res => {if (res.ok) {
                                res.json().then((user) => {
                                  console.log(user)
                                  setAuthChecked(true)})
                              } 
                              else {
                                setAuthChecked(false)
                              }
                      })
  }, [authChecked])
  
  if(!authChecked) { 
    return (
    <BrowserRouter>
          <Routes>
              <Route path="/*" element={<UnAuthApp/>}>
                  <Route path="loginPage" element={<LoginPage handleSetLoggedInUser={handleSetLoggedInUser}/>}/>
                  <Route path="createAccountPage" element={<CreateAccountPage/>}/>
                  <Route index element={<LoginPage/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    )
  }
  return (
      <>  
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />}>
                  <Route path="tasksPage" element={<TaskPage/>}/>
                  <Route path="loginPage" element={<LoginPage handleSetLoggedInUser={handleSetLoggedInUser}/>}/>
                    <Route path="calendarPage" element={<CalendarPage/>}/>
                      <Route path="createAccountPage" element={<CreateAccountPage/>}/>
                    <Route index element={<CalendarPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
      </>
    )
}

export default Router