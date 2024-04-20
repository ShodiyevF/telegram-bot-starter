import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: 5432 || process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASW,
    database: process.env.DB_NAME,
})

export const db = drizzle(pool)
