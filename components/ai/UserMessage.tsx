export function UserMessage({
  message,
}: {
  message: { role: string; content: string };
}) {
  return (
    <div className="w-full flex justify-end">
      <div className="bg-zinc-800 p-2 rounded-2xl w-fit">
        <p>{message.content}</p>
      </div>
    </div>
  );
}
