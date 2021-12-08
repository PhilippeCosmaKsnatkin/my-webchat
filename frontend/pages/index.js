import { io } from "socket.io-client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput" ;
import Message from "../components/message";
import { Container } from "postcss";

export default function Home() {
  const socket = io("ws://localhost:4242");
  const [messages, setMessages] = useState([]);
  //socket.emit("room::join", { room: "default" });
  //socket.emit("room::message::send", { room: "default", message: "Hello" });
  

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
        <ChatInput socket={socket}/>
      </div>
    </div>
  )
}