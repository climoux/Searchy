import { Pool } from 'pg';

const pool = new Pool({
    user: 'mecl4182_searchy',
    host: 'localhost',
    database: 'mecl4182_search_perfo',
    password: 'Ib5umHZJ^AYh',
});

export default pool;