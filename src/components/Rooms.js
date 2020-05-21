import React, { useState, useEffect } from 'react'
import socket from '../utils/socket'


export default function Rooms(props) {
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState(null)

    useEffect(() => {
        socket.on("rooms", data => setRooms(data))
        socket.on("selectedRoom", data => { setSelectedRoom(data) })
        return () => socket.emit("disconnect")
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
                <thead>
                <tr key="1" >
                    <th>Rooms</th>
                </tr>
                </thead>
                <tbody>
                {rooms.map(el => 
                <tr key={el._id} className="tableRow" >
                <td  onClick={() => joinRoom(el._id)}>
                    {el.name}({el.members.length}) </td>
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
