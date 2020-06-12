import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL, ssl: true };
const pool = new Pool(databaseConfig);

export default pool;