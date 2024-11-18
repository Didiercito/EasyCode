import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: { id: number } & JwtPayload;
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

    static verifyToken(token: string): JwtPayload {
        const decoded = jwt.verify(token, TokenService.secretKey) as JwtPayload;
        if (typeof decoded === 'object' && 'id' in decoded) {
            return decoded;
        }
        throw new Error('Invalid token payload');
    }

    static authenticateToken(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
             res.status(401).json({ message: 'Token no proporcionado' });
             return;
        }

        try {
            const decoded = TokenService.verifyToken(token);
            req.user = decoded as { id: number } & JwtPayload;

            if (!req.user.id) {
                 res.status(403).json({ message: 'Token no válido: ID faltante' });
                 return;
            }

            next();
        } catch (error) {
            res.status(403).json({ message: 'Token no válido' });
        }
    }
}
