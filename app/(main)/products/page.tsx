import { SiteHeader } from "@/components/site-header";
import Products from "./Products";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <main>
      <SiteHeader title="Products" />
      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
    </main>
  );
}
