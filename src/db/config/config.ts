import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DB_HOST_MYSQL,              
    port: Number(process.env.DB_PORT_MYSQL),      
    user: process.env.DB_USER_MYSQL,              
    password: process.env.DB_PASSWORD_MYSQL,      
    database: process.env.DB_NAME_MYSQL,          
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
