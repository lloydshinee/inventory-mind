import { deleteItem, upsertItem } from "@/actions/item.action";
import { useEffect, useState, useRef } from "react";

export default function AiMessage({
  message,
}: {
  message: { role: string; content: string };
}) {
  const content = JSON.parse(message.content);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const previousActionRef = useRef<any>(null);

  const handleUpsert = async (item: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    quantity: number;
  }) => {
    const formData = new FormData();
    formData.append("id", item.id);
    formData.append("name", item.name);
    formData.append("description", item.description ?? "");
    formData.append("price", item.price.toString());
    formData.append("quantity", item.quantity.toString());
    await upsertItem(formData);
  };

  const handleRemove = async (id: string) => {
    await deleteItem(id);
  };

  useEffect(() => {
    if (
      done ||
      !Array.isArray(content.action) ||
      JSON.stringify(content.action) ===
        JSON.stringify(previousActionRef.current)
    )
      return;

    previousActionRef.current = content.action;
    setStatus("pending");

    const runActions = async () => {
      try {
        for (const action of content.action) {
          switch (action.type) {
            case "add":
            case "edit":
              await handleUpsert(action.item);
              console.log("upsert", action.item);
              break;
            case "remove":
              await handleRemove(action.item.id);
              console.log("remove", action.item.id);
              break;
          }
        }
        setStatus("success");
        setDone(true);
      } catch (error) {
        console.error("Action failed:", error);
        setStatus("error");
      }
    };

    runActions();
  }, [content.action, done]);

  return (
    <div className="w-full flex flex-col items-start space-y-1">
      <div className="max-w-full">
        <pre className="whitespace-pre-wrap break-words text-left">
          {content.response}
        </pre>
      </div>

      {Array.isArray(content.action) && content.action.length > 0 && (
        <div className="text-xs text-gray-500 italic">
          {status === "pending" && "⏳ Running actions..."}
          {status === "success" && "✔ Actions completed successfully."}
          {status === "error" && "❌ One or more actions failed."}
        </div>
      )}
    </div>
  );
}
