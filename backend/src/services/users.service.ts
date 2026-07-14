import { prisma } from '../db/prisma.js'; 
import type { UserRole } from '../generated/prisma/index.js';


export async function getUserById(id: number) {
	const user = await prisma.user.findUnique({
		where: {id}
	});

	return user;
}

export async function getUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {email}
	});

	return user;
}

export async function getUserByUsername(username: string) {
	const user = await prisma.user.findUnique({
		where: {username}
	});

	return user;
}

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