import React, { useEffect, useState, useRef } from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import './App.css';
import Moment from 'react-moment'
import socket from './utils/socket'
import BreakPage from './pages/BreakPage'
import ChatPage from './pages/ChatPage'
import Header from './components/Header'
import Rooms from './components/Rooms'


function App() {
  const [user, setUser] = useState(null)
  
  

//pass props to pages
// bring chatConnection to each page
// bring structure of page to each page

  useEffect(()=>{
    askUser();
    return () => socket.emit("disconnect")
  }, [])

  const askUser = () => {
    const userName = prompt("Please enter your name")
    if(!userName) return askUser()

    socket.emit("login", userName, cb => {
      console.log('cb', cb)
      setUser(cb)
    })  
  }



  

  return (
    <div >

      <Switch>
        <Route path="/" exact  render={()=> <BreakPage user={user} /> } />
        <Route path="/room" exact  render={()=> <ChatPage user={user} />} />
      </Switch>
      
    </div>
  );
}

export default App;
