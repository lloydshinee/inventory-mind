import prisma from "@/lib/db";
import { UsersTable } from "./users-table";

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <section className="p-2">
      <UsersTable data={users} />
    </section>
  );
}
