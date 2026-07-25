import type { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';

export async function me(req: Request, res: Response) {
	try {
		const user = await authService.me(req.auth!.id);
		
    if (!user || user === 'user_not_found') {
      return res.status(404).json({
        message: 'User not found'
      });
		}

		return res.status(200).json(user);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

type RegisterRequestBody = {
	username: string;
	email: string;
	password: string;
}

export async function register(req: Request<{}, {}, {}, RegisterRequestBody>, res: Response) {
	try {
		const { 
			username,
			email,
			password
		} = req.body as {
			username: string;
			email: string;
			password: string
		};

		if (!username || !email || !password) {
			return res.status(400).json({ message: 'Missing user data' });
		}

		if (typeof email !== 'string') {
				return res.status(400).json({ message: 'Invalid email' });
		}

		if (email.length > 254) {
				return res.status(400).json({ message: 'Email is too long' });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
				return res.status(400).json({ message: 'Invalid email' });
		}

		if (typeof username !== 'string') {
				return res.status(400).json({ message: 'Invalid username' });
		}

		if (username.length < 3 || username.length > 254) {
				return res.status(400).json({ message: 'Invalid username length' });
		}

		const usernameRegex = /^[A-Za-z0-9_-]+$/;

		if (!usernameRegex.test(username)) {
				return res.status(400).json({ message: 'Invalid username' });
		}

		if (typeof password !== 'string') {
				return res.status(400).json({ message: 'Invalid password' });
		}

		if (password.length < 8 || password.length > 128) {
				return res.status(400).json({ message: 'Invalid password length' });
		}

		const result = await authService.register({username, email, password});
		if (typeof result === 'string') {
			if (result === 'username_exists') {
				return res.status(409).json({
					message: "User with that username already exists"
				});
			}

			if (result === 'email_exists') {
				return res.status(409).json({
					message: "User with that email already exists"
				});
			}
			
			//below shouldn't happen
			return res.status(400).json({
				message: result
			});
		}
		
		const token = authService.generateToken(result.id, result.role);

		res.cookie('token', token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 7
		});

		return res.status(201).json({
			message: 'user created'
		});

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

type LoginRequestQuery = {
	identifier: string;
	password: string;
}

export async function login(req: Request<{}, {}, {}, LoginRequestQuery>, res: Response) {
	try {
		const { 
			identifier,
			password
		} = req.body as {
			identifier: string
			password: string
		};

		if (!identifier) {
			return res.status(400).json({message: 'Missing login data'});
		}

		if (!password) {
			return res.status(400).json({ message: 'Missing password' });
		}

		const result = await authService.login({identifier, password});

		if (result === 'user_not_found' || result === 'wrong_password') {
			return res.status(401).json({ message: 'Incorrect login or password' });
		}

		res.cookie('token', result, {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 7
		});

		return res.status(201).json({
			message: 'user logged in'
		});

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export function logout(req: Request, res: Response) {
	res.clearCookie('token', {
		httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
	});
  res.status(200).json({ message: 'Logged out' });
}