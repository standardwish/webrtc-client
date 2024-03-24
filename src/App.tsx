import { useEffect, useState } from "react";
import "./App.css";
import { MyForm } from "./containers/socket/my-form";
import { socket } from "./lib/socket";
import { SocketData } from "./types/socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<SocketData[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMsgResponse({ userName, userId, message }: SocketData) {
      setMessages((currentMessages) => [
        ...currentMessages,
        { userName, userId, message },
      ]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("msg-response", onMsgResponse);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("msg-response", onMsgResponse);
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setMessages([]);
    }
  }, [isConnected]);

  return (
    <div className="App">
      <div className="h-screen flex flex-col justify-end items-end gap-5 relative pb-8">
        <div className="w-full">
          <ul className="items-start">
            {messages.map((msg, idx) => (
              <li key={idx}>
                {msg.userName}: {msg.message}
              </li>
            ))}
          </ul>
        </div>
        <MyForm />
      </div>
    </div>
  );
}

export default App;
