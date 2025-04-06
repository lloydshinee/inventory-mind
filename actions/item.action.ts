"use server";

import prisma from "@/lib/db";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export async function upsertItem(data: FormData) {
  try {
    const productId = data.get("productId") as string | null;
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const price = parseInt(data.get("price") as string);
    const quantity = parseInt(data.get("quantity") as string);

    await prisma.item.upsert({
      where: productId ? { id: productId } : { name },
      update: {
        name,
        description,
        price,
        quantity,
      },
      create: {
        name,
        description,
        price,
        quantity,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upsert item");
  }
}

export async function deleteItem(id: string) {
  try {
    await prisma.item.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete item");
  }
}

export async function getItems() {
  return await prisma.item.findMany();
}
