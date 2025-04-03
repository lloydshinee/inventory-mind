import { Loader2Icon } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <Loader2Icon className="animate-spin" size={40} />
    </main>
  );
}
