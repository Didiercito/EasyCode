import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class TokenService {
    private static secretKey = process.env.JWT as string; 

    static generateToken(id: number): string {
        const payload = { id }; 
        const options = { expiresIn: '1h' };

        return jwt.sign(payload, TokenService.secretKey, options); 
    }

    static verifyToken(token: string): string | object {
        try {
            return jwt.verify(token, TokenService.secretKey); 
        } catch (error) {
            throw new Error('Token no válido');
        }
    }
}
