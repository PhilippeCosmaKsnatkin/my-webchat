import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput" ;
import Message from "../components/message";
import { Container } from "postcss";

export default function Home() {
  const socket = io("ws://localhost:4242");
  socket.emit("room::join", { room: "default" });
  socket.emit("room::message::send", { room: "default", message: "Hello" });

  socket.on("room::message::send", ({ room, message }) => {
    console.log("Message received:", room, message);
  });
  const messages = [
    {
      avatar : "https://fr.seaicons.com/wp-content/uploads/2017/02/Cute-Ball-Go-icon.png",
      message : "Test premier"
    },
    {
      avatar : "https://fr.seaicons.com/wp-content/uploads/2017/02/Cute-Ball-Go-icon.png",
      message : "Test second"
    }
  ]
  const listMessage = messages.map(({avatar, message}) =>
    <Message avatar={avatar} message={message}/>
  );

  return (
    <div className="root ">
      <Sidebar items={["room1","room2","room3"]}/>

      <div className="my-container">
        {listMessage}
        <ChatInput/>
      </div>
    </div>
  )
}