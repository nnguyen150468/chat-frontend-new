import React, { useEffect, useState, useRef } from 'react';
import WholeDesign from '../components/WholeDesign'
import socket from '../utils/socket'



export default function BreakPage(props) {
    const [chat, setChat] = useState("")
    const [chatLog, setChatLog] = useState([])
    const chatLogRef = useRef(chatLog)
  

    useEffect(()=>{
        chatConnection();
        return () => socket.emit("disconnect")
      }, [])

    const chatConnection = () => {
        socket.on("message", (msg)=>{
          chatLogRef.current.push(msg)
          setChatLog([...chatLogRef.current])
          // console.log('msg frontned',msg)
          // console.log('chatLog', chatLog)
        })
      }

    return (
          <div >
              <WholeDesign user={props.user} chat={chat} setChat={setChat} 
              chatLog={chatLog} setChatLog={setChatLog} chatLogRef={chatLogRef}/>
        </div>
    )
}
