import React from 'react'

export default function Header(props) {
    return (
        <div className="header">
            <img src="https://ih1.redbubble.net/image.394724457.9721/flat,750x1000,075,f.jpg" className="profile-pic"></img>
            <div >{props.user? props.user.name : "Guest"}</div>
            <div className="system-bubble">Please join a room to chat &#128513;</div>
        </div>
    )
}
