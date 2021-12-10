import { io } from "socket.io-client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter();
  const [roomId, setRoomID] = useState("");
  const [roomList, setRoomList] = useState([]);
  function submit() {
    
    router.push(`/room/${roomId}`);
  }
  function handleChange(e) {
    setRoomID(e.target.value);
  }
  
  
  
  useEffect(() => {
    const socket = io("ws://localhost:4242");
    socket.emit("getListRoom");
    socket.on("listRoom::", (data) => {
      setRoomList(data);
      console.log(data);
    });
    
  }, []);

  
  
  
  

  return (
    <div className="root ">
      <Sidebar items={roomList}/>
      <form onSubmit={e=>{e.preventDefault();
        submit()}}>
      
        <input type="text" placeholder="Room Name" value={roomId} onChange={handleChange}/>
      
      </form>
      
      
    </div>
  )
}