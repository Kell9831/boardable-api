import { query } from "../db";
import { List, ListParams } from "../models/list";
import { patchFormat } from "../utils/util";

export async function newList(data: ListParams, boardId: number | string) {
  return (
    await query(
      `INSERT INTO lists (title, board_id) 
      VALUES ($1, $2) 
      RETURNING id, title, board_id;`,
      [data.title, boardId]
    )
  ).rows[0];
}

export async function getListById(listId: string) {
  return await query(`SELECT * FROM lists WHERE id = $1;`, [listId]);
}

export async function editList(data: ListParams, listId: string) {
  const stringData = patchFormat(data);
  return (
    await query(
      `UPDATE lists SET ${stringData} WHERE id = $1 RETURNING *;`,
      [listId]
    )
  ).rows[0];
}

export async function getAllListsByBoardId(boardId: string): Promise<List[]> {
  return (
    await query("SELECT * FROM lists WHERE board_id = $1", [boardId])
  ).rows;
}

export async function deleteList(listId: number): Promise<void> {
  await query("DELETE FROM lists WHERE id = $1", [listId]);
}
