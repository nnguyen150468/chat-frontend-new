import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Moment from 'react-moment'
import socket from './utils/socket'
import {Switch, Route} from 'react-router'
import Header from './components/Header'
import Rooms from './components/Rooms'

const moment = require('moment')

function App() {
  const [chat, setChat] = useState("")
  const [user, setUser] = useState(null)
  const [chatLog, setChatLog] = useState([])
  const chatLogRef = useRef(chatLog)

  useEffect(()=>{
    askUser();
    chatConnection();
    return () => socket.emit("disconnect")
  }, [])

  const askUser = () => {
    const userName = prompt("Please enter your name")
    if(!userName) return askUser()

    socket.emit("login", userName, cb => {
      // if(!cb.ok) return alert("Cannot login!")
      // setUser(cb.data)
      setUser(cb)
    })
  
  }

  const chatConnection = () => {
    socket.on("message", (msg)=>{
      chatLogRef.current.push(msg)
      // if(chatLog.length>15){
      //   chatLogRef.current = chatLogRef.current.slice(chatLogRef.current.length-15)
      // }
      setChatLog([...chatLogRef.current])
      console.log('msg frontned',msg)
      console.log('chatLog', chatLog)
    })
  }

  const handleChange = (e) => {
    setChat(e.target.value)
  }

  const submitChat = (e) => {
    e.preventDefault()
    if(user){ 
      socket.emit("chat", {
      name: user.name,
      text: chat
    }, err => {
      if(err) return console.log(err)
    })
    setChat("")
  }
  }

  const leaveRoom = () => {
    socket.emit("leaveRoom", null)
  }

  const renderChat = () => {
    console.log('chatLog createAt======', chatLog)
    return chatLog.map(el => <div key={el._id} className="text-row">
      <div className="text-content">
        <div className="text-name"><strong>{el.user.name===" "? " " : el.user.name} </strong></div>
        <div className={el.user.name===" "? "system" : "text-bubble"}>{el.text}</div>
      </div>
    <div className="createdAt" style={{display:!el.createdAt? "none": ""}}><Moment fromNow>{el.createdAt}</Moment></div></div>)
  }

  return (
    <div className="whole-body">

      
      <div className="sideBar">
      <Header user={user}/>
      <Rooms leaveRoom={leaveRoom}/>
      <div className="leaveContainer">
      <button className="leaveButton" onClick={leaveRoom}>Leave</button>
      </div>
      </div>

      <div className="main-content">
      
      <div className="chat-log scroll">
        {renderChat()}
      </div>
      <div className="chatbox">
        <form onChange={handleChange} onSubmit={submitChat} className="form">
          <input className="inputBar" type="text" value={chat}/>
          <button className="chatButton" type="submit">chat</button>
        </form>
      </div>
      
      </div>
      
    </div>
  );
}

export default App;
