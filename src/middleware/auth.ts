import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}

export class TokenService {
    private static secretKey = process.env.JWT as string;

    static generateToken(id: number): string {
        const payload = { id };
        const options = { expiresIn: '1h' };

        return jwt.sign(payload, TokenService.secretKey, options);
    }

    static verifyToken(token: string): string | JwtPayload {
        try {
            return jwt.verify(token, TokenService.secretKey);
        } catch (error) {
            throw new Error('Token no válido');
        }
    }

    static authenticateToken(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
             res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = TokenService.verifyToken(token as string);
            req.user = decoded;
            console.log(decoded)
            next();
        } catch (error) {
            res.status(403).json({ message: 'Token no válido' });
        }
    }
}
