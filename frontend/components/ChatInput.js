import { useState } from 'react';

export default function ChatInput(props){
    const [message, setMessage] = useState("");
    function send(){
        props.socket.emit("room::message::send", { room: "default", message: message });

    }
    function handleChange(e){
        setMessage(e.target.value)
    }

    return(
        <div className = "send">
            <input className="textBar" type="text" value={message} onChange={handleChange} />
            <button onClick={send}>
                Send
            </button>
        </div>
    )
}