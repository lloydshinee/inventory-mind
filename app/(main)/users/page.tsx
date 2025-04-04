import { SiteHeader } from "@/components/site-header";
import { UsersTable } from "./users-table";
import { Suspense } from "react";
import Users from "./Users";

export default function UsersPage() {
  return (
    <main className="space-y-4">
      <SiteHeader title="Users" />
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
    </main>
  );
}
