import { room_socket } from "@/lib/socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const { roomId } = useParams();

  function onMsgResponse({ message }: { message: string }) {
    console.log(message);
  }
  useEffect(() => {
    room_socket.connect();

    if (room_socket.connected) {
      const roomId = Math.random().toString(36).substring(2);
      room_socket.emit("cnt-req", { roomId: roomId });
    }

    room_socket.on("cnt-res", onMsgResponse);
    return () => {
      room_socket.disconnect();
    };
  }, []);

  return <div>THIS IS ROOM FOR ROOM ID {roomId}!</div>;
}
