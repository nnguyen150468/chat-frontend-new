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
  const [chat, setChat] = useState("")
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
      setUser(cb)
    })  
  }

  const chatConnection = () => {
    socket.on("message", (msg)=>{
      chatLogRef.current.push(msg)
      setChatLog([...chatLogRef.current])
      // console.log('msg frontned',msg)
      // console.log('chatLog', chatLog)
    })
  }

  const handleChange = (e) => {
    setChat(e.target.value)
  }


  const submitChat = (e) => {
    e.preventDefault()
  
    if(window.location.href.includes("room")){
      if(user){ 
        socket.emit("chat", {
        name: user.name,
        text: chat
      }, err => {
        if(err) return console.log(err)
      })}
    } else{
      socket.emit("remindJoinRoom", null);
    }
  
    setChat("")
  }


  const leaveRoom = () => {
    socket.emit("leaveRoom", null)
  }

  const renderChat = () => {
    // console.log('chatLog createAt======', chatLog)
    return chatLog.map(el => <div key={el._id} className="text-row">
      <div className="text-content">
        <div className="text-name"><strong>{el.user.name===" "? " " : el.user.name} </strong></div>
        <div className={el.user.name===" "? "system" : "text-bubble"}>{el.text}</div>
      </div>
    <div className="createdAt" style={{display:!el.createdAt? "none": ""}}><Moment fromNow>{el.createdAt}</Moment></div></div>)
  }

  return (
    <div className="whole-body">

      <Switch>
        <Route path="/" exact chat={chat} setChat={setChat} renderChat={renderChat} chatLog={chatLog} setChatLog={setChatLog}
      handleChange={handleChange} submitChat={submitChat} chatConnection={chatConnection} chatLogRef={chatLogRef} component={BreakPage}/>
        <Route path="/chat" chat={chat} setChat={setChat} renderChat={renderChat} chatLog={chatLog} setChatLog={setChatLog}
      handleChange={handleChange} submitChat={submitChat} chatConnection={chatConnection} chatLogRef={chatLogRef} exact component={ChatPage}/>
      </Switch>

      <div className="sideBar">
      <Header user={user}/>
      <Rooms leaveRoom={leaveRoom} setChatLog={setChatLog} chatLogRef={chatLogRef}/>
      <div className="leaveContainer">
      <Link to="/" style={{textDecoration:"none"}}><button className="leaveButton" onClick={leaveRoom}>Leave</button></Link>
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
