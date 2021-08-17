import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import socket from './utils/socket'
import BreakPage from './pages/BreakPage'
import ChatPage from './pages/ChatPage'


function App() {
  const [user, setUser] = useState(null)



  //pass props to pages
  // bring chatConnection to each page
  // bring structure of page to each page

  useEffect(() => {
    askUser();
    return () => socket.emit("disconnect")
  }, [])

  const askUser = () => {
    const userName = prompt("Please enter your name")
    if (!userName) return askUser()

    socket.emit("login", userName, cb => {
      console.log('cb', cb)
      setUser(cb)
    })
  }





  return (
    <div >

      <Switch>
        <Route path="/" exact render={() => <BreakPage user={user} />} />
        <Route path="/room" exact render={() => <ChatPage user={user} />} />
      </Switch>

    </div>
  );
}

export default App;
