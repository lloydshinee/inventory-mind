"use client";

import { getItems } from "@/actions/item.action";
import { Item } from "@/generated/prisma";
import { getAiResponse } from "@/lib/ai";
import { useEffect, useState } from "react";

export const useProductAi = (
  messages: any[],
  setMessages: (messages: any[]) => void
) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Item[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const items = await getItems();
      setProducts(items);
      const productMessage = {
        role: "system",
        content: `Here is the list of available products:\n${JSON.stringify(
          items,
          null,
          2
        )}`,
      };
      setMessages([productMessage, ...messages]);
    };

    if (products.length === 0) fetchProducts();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const aiContent = await getAiResponse(newMessages);
      if (aiContent) {
        newMessages.push({ role: "assistant", content: aiContent });
        setMessages(newMessages);
      }
    } catch (err) {
      newMessages.push({
        role: "assistant",
        content: JSON.stringify({
          response:
            "Sorry, something went wrong while fetching the AI response.",
          action: null,
        }),
      });
      setMessages(newMessages);
    } finally {
      setIsLoading(false);
    }
  };

  return { input, setInput, isLoading, handleSend };
};
