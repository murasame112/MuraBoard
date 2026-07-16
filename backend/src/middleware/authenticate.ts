import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { UserRole } from '../generated/prisma/index.js';

type JwtPayload = {
    id: number;
    role: UserRole;
};

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        req.auth = payload;

        next();
    }
    catch {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}