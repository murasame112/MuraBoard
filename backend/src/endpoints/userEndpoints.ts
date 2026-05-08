import type { Request, Response } from 'express';
import {prisma} from '../index.js';
import bcrypt from 'bcrypt';

type CreateUserBody = {
  email: string;
  name: string;
  password: string;
};

export async function createUser(req: Request<{}, {}, CreateUserBody>, res: Response){
	try{
		const {email, name, password} = req.body;
		
		if (!email || !name || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

		const hashed = bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				email,
				name,
				passwordHash: await hashed
			}
		});

		return res.status(201).json(newUser.id);
	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
	
}