"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { UserMessage } from "./UserMessage";
import AiMessage from "./AiMessage";
import { useProductAi } from "@/hooks/useAi";

export function AiChat() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are a helpful inventory management assistant.",
    },
    {
      role: "assistant",
      content: JSON.stringify({
        response: "Hello! How can I assist you with your inventory today?",
        action: null,
      }),
    },
  ]);

  const { setInput, input, isLoading, handleSend } = useProductAi(
    messages,
    setMessages
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="h-screen w-full flex flex-col">
      <ScrollArea className="w-full flex-1">
        <div className="flex flex-col gap-5 p-4 pt-14">
          {messages
            .filter((message) => message.role !== "system")
            .map((message, index) =>
              message.role === "user" ? (
                <UserMessage key={index} message={message} />
              ) : (
                <AiMessage key={index} message={message} />
              )
            )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      <div className="h-24 flex items-center gap-2 pb-4">
        <div className="relative w-full">
          <Input
            className="h-14 p-4 pr-12 border border-gray-300 rounded-md w-full"
            placeholder="Ask about your products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) handleSend();
            }}
          />
          <Button
            variant="ghost"
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2"
            size="icon"
            disabled={isLoading}
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}
