import { query } from "../db";
import { editUserParams } from "../models/user";
import { patchFormat } from "../utils/util";

export async function getProfileById(userId: number) {
  return (
    await query(
      `SELECT id , username , password, name, email 
    FROM users WHERE id = $1`,
      [userId]
    )
  ).rows[0];
}

export async function editProfile(data: editUserParams, userId: number) {
  const stringData = patchFormat(data);
  return (
    await query(
      `UPDATE users SET ${stringData} 
    WHERE id = $1 RETURNING id , username, password ,name, email;`,
      [userId]
    )
  ).rows[0];
}

export async function deleteProfile(userId: number) {
  return await query(`DELETE FROM users WHERE id = $1`, [userId]);
}
