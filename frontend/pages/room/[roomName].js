import { useRouter } from 'next/router'
import { io } from "socket.io-client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar.js"
import ChatInput from "../../components/ChatInput" ;
import Message from "../../components/message";
import { useEffect } from 'react';

const Post = () => {
  const socket = io("ws://localhost:4242");
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const { roomName } = router.query;
  const [roomList, setRoomList] = useState([]);

  useEffect(()=>{
    
    socket.emit("room::join", { room: roomName });
    socket.emit("getListRoom");
    socket.on("listRoom::", (data) => {
      setRoomList(data);
    });
    
    
  },[]);

  socket.on("room::message::send", ({ room, message }) => {
    console.log("Message received:", room, message);
    setMessages(messages =>[...messages, message]);
  });

  const listMessage = messages.map((message) =>
    <Message message={message}/>
  );

  return (
    <div className="root ">
      <Sidebar items={roomList}/>

      <div className="my-container">
        {listMessage}
        <ChatInput socket={socket} room={roomName}/>
      </div>
    </div>
  )
}

export default Post