import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["NAME_DB"],
  user: process.env["USER_DB"],
  password: process.env["PASS_DB"],
});

export const query = async (text: string, params?: (string | number | undefined )[]): Promise<QueryResult<any>> => {
  return await pool.query(text, params);
};

