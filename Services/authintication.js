import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;