import { compare } from "bcryptjs";

import type { User } from "@/generated/prisma/client.js";
import prisma from "@/utils/getPrisma.js";
import type { LoginDto } from "./auth.types.js";

export async function checkCredential(data: LoginDto): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  const ok = await compare(
    data.password,
    user ? user.password : "FAKEPASSWORD",
  );

  return ok ? user : null;
}