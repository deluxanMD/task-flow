import { Pool } from 'pg';
import '../config/env';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
