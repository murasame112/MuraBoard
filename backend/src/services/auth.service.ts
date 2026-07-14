/*
login()  
  
verifyToken()  
  
hashPassword()  
  
comparePassword()
*/

import { prisma } from '../db/prisma.js';
import * as usersService from './users.service.js';
import bcrypt from 'bcrypt';
import type { User, UserRole } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken';

export type RegisterValues = {
	username: string;
	email: string;
	password: string;
};

export async function register({username, email, password}: RegisterValues): Promise<{id: number, role: UserRole} | string> {
	const existingUsername = await usersService.getUserByUsername(username);
	if (existingUsername) {
		return 'username_exists';
	}

	const existingEmail = await usersService.getUserByEmail(email);
	if (existingEmail) {
		return 'email_exists';
	}

	const passwordHash = await hashPassword(password);

	const result = usersService.createUser({username, email, passwordHash});

	return result;
}

async function hashPassword(password: string){
	return bcrypt.hash(password, 10);
}

export async function generateToken(id: number, role: UserRole) {
	const token = jwt.sign(
		{
		id: id,
		role: role
		},
		process.env.JWT_SECRET!,
		{
			expiresIn: '7d'
		}
	);
	return token;
}