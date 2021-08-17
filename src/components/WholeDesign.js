import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import Header from './Header'
import Rooms from './Rooms'
import socket from '../utils/socket'

export default function WholeDesign(props) {


  const handleChange = (e) => {
    props.setChat(e.target.value)
  }


  const submitChat = (e) => {
    e.preventDefault()

    if (window.location.href.includes("room")) {
      if (props.user) {
        socket.emit("chat", {
          name: props.user.name,
          text: props.chat
        }, err => {
          if (err) return console.log(err)
        })
      }
    } else {
      socket.emit("remindJoinRoom", null);
    }

    props.setChat("")
  }


  const leaveRoom = () => {
    socket.emit("leaveRoom", null)
  }

  const renderChat = () => {
    // console.log('chatLog createAt======', chatLog)
    return props.chatLog.map(el => <div key={el._id} className="text-row">
      <div className="text-content">
        <div className="text-name"><strong>{el.user.name === " " ? " " : el.user.name} </strong></div>
        <div className={el.user.name === " " ? "system" : "text-bubble"}>{el.text}</div>
      </div>
      <div className="createdAt" style={{ display: !el.createdAt ? "none" : "" }}><Moment fromNow>{el.createdAt}</Moment></div></div>)
  }


  return (
    <div className="whole-body">
      <div className="sideBar">
        <Header user={props.user} />
        <Rooms leaveRoom={leaveRoom} />
        <div className="leaveContainer">
          <Link to="/" style={{ textDecoration: "none" }}><button className="leaveButton" onClick={leaveRoom}>Leave</button></Link>
        </div>
      </div>

      <div className="main-content">

        <div className="chat-log scroll">
          {renderChat()}
        </div>
        <div className="chatbox">
          <form onChange={handleChange} onSubmit={submitChat} className="form">
            <input className="inputBar" type="text" value={props.chat} />
            <button className="chatButton" type="submit">chat</button>
          </form>
        </div>
      </div>
    </div>
  )
}
