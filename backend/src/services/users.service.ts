import { prisma } from '../db/prisma.js'; 

type CreateUserValues = {
  username: string;
  email: string;
  passwordHash: string;
}
export async function createUser({username, email, passwordHash}: CreateUserValues) {

  const existingUser = await prisma.user.findFirst({
    where: {OR: [
      {username},
      {email}
    ]}
  });
  if (existingUser) {
    return 'uesr already exists';
  }

  const result = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash
    }
  });

  return result;
}

