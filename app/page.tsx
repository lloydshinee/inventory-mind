import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <nav className="w-full p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-base font-semibold">Inventory Mind</span>
        </div>
        <div>
          <Button variant="link" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </nav>
      <section className="p-32 text-center flex flex-col gap-10 items-center justify-center">
        <h1 className="text-2xl md:text-7xl font-bold">
          AI Powered Inventory Management System
        </h1>
        <p className="text-zinc-400 text-md">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          sunt similique voluptas perspiciatis amet quidem eligendi vel mollitia
          eius id quis aspernatur provident quam officiis, nam consequatur!
          Doloremque, porro quos. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Sit incidunt ab perferendis sed? Commodi, excepturi?
          Tenetur nisi, animi voluptatum facere illo quam omnis, dolor excepturi
          sed maxime dolorum quas officiis.
        </p>
      </section>
    </main>
  );
}
