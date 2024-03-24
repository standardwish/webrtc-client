import { io } from "socket.io-client";

const URL = "http://localhost:3000";
const ROOM_URL = `${URL}/room`;

export const socket = io(URL, {
  autoConnect: false,
});
export const room_socket = io(ROOM_URL, {
  autoConnect: false,
});
