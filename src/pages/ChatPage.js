import React, { useEffect, useState, useRef } from 'react';
import {useHistory} from 'react-router-dom'
import Moment from 'react-moment'
import Header from '../components/Header'
import Rooms from '../components/Rooms'
import socket from '../utils/socket'


export default function ChatPage(props) {
    const [chat, setChat] = useState("")
  const [chatLog, setChatLog] = useState([])
  const chatLogRef = useRef(chatLog)

    useEffect(() => {
        chatConnection();
        return () => socket.emit("disconnect")
      }, [])
  
    const chatConnection = () => {
      socket.on("message", (msg)=>{
        chatLogRef.current.push(msg)
        setChatLog([...chatLogRef.current])
        console.log('msg frontned',msg)
        console.log('chatLog', chatLog)
      })
    }
  
    
  
    return (
        <div >
        </div>
    )
}
