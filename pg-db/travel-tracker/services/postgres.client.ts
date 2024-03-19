import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const client = new pg.Pool({
    host: process.env.HOSTNAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DB_NAME
});


export default client;
