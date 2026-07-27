import * as usersService from './users.service.js';
import bcrypt from 'bcrypt';
import type { UserRole } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken';

export async function me(id: number) {
	const user = 	await usersService.getUserById(id);
	if (!user) return 'user_not_found';
	const { passwordHash, ...safeUser } = user;
	return safeUser;
}

type RegisterValues = {
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

	const result = await usersService.createUser({username, email, passwordHash});

	return result;
}

async function hashPassword(password: string){
	return bcrypt.hash(password, 12);
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

type LoginValues = {
	identifier: string;
	password: string;
};
export async function login({identifier, password}: LoginValues): Promise<string> {

	const user = await usersService.getUserByUsernameOrEmail(identifier);
	if (!user) return 'user_not_found';

	if (!(await verifyPassword(password, user.passwordHash))) {
		return 'wrong_password';
	}

	const token = jwt.sign(
		{
			id: user.id,
			role: user.role
		},
		process.env.JWT_SECRET!,
		{
			expiresIn: '7d'
		}
	)
	return token;
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}