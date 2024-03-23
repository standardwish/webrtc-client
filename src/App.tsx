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

    function onMsgReponse({ userName, userId, message }: SocketData) {
      setMessages((currentMessages) => [
        ...currentMessages,
        { userName, userId, message },
      ]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("msg-response", onMsgReponse);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("msg-response", onMsgReponse);
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setMessages([]);
    }
  }, [isConnected]);
  console.log(socket.disconnected);

  return (
    <div className="App">
      <div className="h-[calc(100vh_-_60px)] flex flex-col justify-end items-end gap-5 px-11 relative pb-10">
        <div className="w-full">
          <ul className="items-start">
            {messages.map((msg) => (
              <li>
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
