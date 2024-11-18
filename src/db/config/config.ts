import dotenv from 'dotenv';
import mysql2 from 'mysql2/promise';

dotenv.config();

const config = {
    host: process.env.DB_HOST_MYSQL,
    user: process.env.DB_USER_MYSQL,
    password: process.env.DB_PASSWORD_MYSQL,
    database: process.env.DB_NAME_MYSQL,
    connectionLimit: 10
};


export const pool = mysql2.createPool(config);


