import prisma from "@/lib/db";
import { ProductsTable } from "./products-table";

export default async function Products() {
  const products = await prisma.item.findMany();

  return (
    <section className="p-2">
      <ProductsTable data={products} />
    </section>
  );
}
