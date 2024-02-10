import { query } from "../db";
import { User } from "../models/user";

export async function getUser(id: number): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}

//obtener usuarios de la db
export async function getAllUsers(): Promise<User[]> {
  return (await query("SELECT * FROM users")).rows;
}

export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE username = $1", [username]))
    .rows[0];
}

export async function createUser(
  username: string,
  password: string,
  email: string | undefined,
  name:string | undefined,
): Promise<User> {
  return (
    await query(
      "INSERT INTO users (username, password, name,email) VALUES ($1, $2, $3,$4) RETURNING *",

      [username, password,name,email]
    )
  ).rows[0];
}

export async function updateUser(
  id: number,
  username: string,
  password: string ,
  name: string,
  email: string
): Promise<User | undefined> {
  return (
    await query(
      "UPDATE users SET username = $2, password = $3,name = $4, email = $5 WHERE id = $1 RETURNING *",
      [id, username, password,name, email]
    )
  ).rows[0];
}

export async function getUserByUsernameOrEmail(username: string, email: string): Promise<User | undefined> {
  const result = await query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
  return result.rows[0];
}


export async function deleteUser(id: number): Promise<void> {
  await query("DELETE FROM users WHERE id = $1", [id]);
}

