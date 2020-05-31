import React, { useState, useEffect } from 'react'
import socket from '../utils/socket'
import {Link} from 'react-router-dom'

export default function Rooms(props) {
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState(null)

    useEffect(() => {
        socket.on("rooms", data => setRooms(data))
        socket.on("selectedRoom", data => { setSelectedRoom(data) })
    }, [])

    const joinRoom = (rID) => {
        props.leaveRoom()
        socket.emit("joinRoom", rID, cb => {
            if (cb) { console.log(cb) }
            // setSelectedRoom(cb.data)
        })
    }

    const renderRooms = () => {
        return (
            <table>
                <thead >
                <tr key="1" style={{backgroundColor: "rgb(1, 58, 51)"}}>
                    <th>Rooms</th>
                </tr>
                </thead>
                <tbody>
                {rooms.map(el => 
                <tr key={el._id} className="tableRow" >
                <Link style={{textDecoration: 'none', color: "white"}} to="chat"><td  onClick={() => joinRoom(el._id)}>
                    {el.name}({el.members.length}) </td>
                    </Link>
                </tr>
                )}
                </tbody>
            </table>)
    }

    return (
        <div>
            {renderRooms()}
        </div>
    )
}
