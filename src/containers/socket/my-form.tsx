import { Input } from "@/components/ui/input";
import { ProfileContext } from "@/context/provider";
import { socket } from "@/lib/socket";
import { useContext, useState } from "react";
import { Button } from "../../components/ui/button";

export function MyForm() {
  const context = useContext(ProfileContext);
  const { id, name } = context.data;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onReset = () => {
    setMessage("");
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit("msg-request", {
      userId: id,
      userName: name,
      message: message,
    });
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-5 items-start"
    >
      <Input
        name="message"
        value={message}
        onChange={onChange}
        className="w-full"
        placeholder="보낼 메세지를 작성해주세요"
      />
      <div className="flex flex-row gap-4">
        <Button type="submit" disabled={isLoading || socket.disconnected}>
          Submit
        </Button>
        <Button variant={"outline"} type="button" onClick={onReset}>
          Clear
        </Button>
      </div>
    </form>
  );
}
