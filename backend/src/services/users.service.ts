
import { prisma } from '../db/prisma.js'; 
import type { UserRole } from '../generated/prisma/index.js';

type CreateUserValues = {
  username: string;
  email: string;
  passwordHash: string;
}
export async function createUser({username, email, passwordHash}: CreateUserValues): Promise<{id: number, role: UserRole} | string> {

  const existingUser = await prisma.user.findFirst({
    where: {OR: [
      {username},
      {email}
    ]}
  });
  if (existingUser) {
    return 'user already exists';
  }

  const result = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash
    }
  });

  return {id: result.id, role: result.role};
}

