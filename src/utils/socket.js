import socketIOClient from 'socket.io-client';
// const socket = socketIOClient("http://localhost:5000")
const socket = socketIOClient(process.env.REACT_APP_SERVER)
// const socket = socketIOClient("https://nguyen-chat.herokuapp.com/")


export default socket