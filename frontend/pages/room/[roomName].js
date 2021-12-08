import { useRouter } from 'next/router'
import { io } from "socket.io-client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar.js"
import ChatInput from "../../components/ChatInput" ;
import Message from "../../components/message";
import { Container } from "postcss";
const Post = () => {
  const router = useRouter()
  const { roomName } = router.query
    console.log(roomName);

    
  const socket = io("ws://localhost:4242");
  const [messages, setMessages] = useState([]);
  socket.emit("room::join", { room: roomName });
  
  

  socket.on("room::message::send", ({ room, message }) => {
    console.log("Message received:", room, message);
    setMessages([...messages, message]);
  });
  
  const listMessage = messages.map((message) =>
    <Message message={message}/>
  );

  return (
    <div className="root ">
      <Sidebar items={["room1","room2","room3"]}/>

      <div className="my-container">
        {listMessage}
        <ChatInput socket={socket} room={roomName}/>
      </div>
    </div>
  )
}

export default Post