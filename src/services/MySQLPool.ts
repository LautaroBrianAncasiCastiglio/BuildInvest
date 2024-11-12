import mysql, { Pool } from "mysql2/promise";

export const MySQLPool: Pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "buildinvest",
    port: +process.env.DB_PORT!,
});

export default MySQLPool;
