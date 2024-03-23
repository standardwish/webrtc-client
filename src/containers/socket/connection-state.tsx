export function ConnectionState({ isConnected }: { isConnected: boolean }) {
  return (
    <h1 className="absolute right-10 bottom-10 text-xl font-bold">
      연결상태 : {isConnected ? "🟢" : "🔴"}
    </h1>
  );
}
