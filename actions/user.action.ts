"use server";

import prisma from "@/lib/db";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export async function createUser(data: FormData) {
  try {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const role = data.get("role") as string;
    const password = data.get("password") as string;
    const file = data.get("profileImage") as File | null;

    let imagePath = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileExt = file.name.split(".").pop(); // Get file extension
      const safeEmail = email.replace(/[@.]/g, "_"); // Replace `@` and `.` with `_`
      const fileName = `${safeEmail}.${fileExt}`; // Use email as filename
      const uploadPath = path.join(
        process.cwd(),
        "public/userProfiles",
        fileName
      );

      await writeFile(uploadPath, buffer);
      imagePath = `/userProfiles/${fileName}`; // Relative path for frontend
    }
    await prisma.user.create({
      data: {
        name,
        email,
        password, // Hash in production!
        role: role === "ADMIN" ? "ADMIN" : "USER",
        image: imagePath,
      },
    });
    revalidatePath("/users");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
}
