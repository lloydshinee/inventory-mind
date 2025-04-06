import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Bot } from "lucide-react";
import { AiChat } from "./AiChat";

export function ProductAI() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bot />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetTitle className="flex items-center gap-2 absolute top-0 left-0 w-full p-4 bg-black/70 z-50 backdrop-blur-md">
          <Bot />
          Product AI
        </SheetTitle>
        <AiChat />
      </SheetContent>
    </Sheet>
  );
}
