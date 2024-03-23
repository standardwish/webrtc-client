import { socket } from "@/lib/socket";
import { Button } from "../../components/ui/button";

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className="flex flex-row justify-between w-full">
      <Button onClick={connect}>Connect</Button>
      <Button onClick={disconnect}>Disconnect</Button>
    </div>
  );
}
