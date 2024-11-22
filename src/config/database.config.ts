// src/config/database.config.ts

export const databaseConfig = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'chinmay09',
    database: process.env.DATABASE_NAME || 'postgres',
  };
  