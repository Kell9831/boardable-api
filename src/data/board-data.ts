import { query } from "../db";
import { Board, BoardParams } from "../models/board";
import { patchFormat } from "../utils/util";

export async function newBoard(data: BoardParams, userId: number) {
  return (
    await query(
      `INSERT INTO boards (userId, title, color, created_at) 
      VALUES ($1, $2, $3, NOW()) 
      RETURNING id, title, color, created_at;`,
      [userId, data.title, data.color]
    )
  ).rows[0];
}

export async function getBoardById(boardId: string) {
  return await query(`SELECT * FROM boards WHERE id = $1;`, [boardId]);
}

export async function editBoard(data: BoardParams, boardId: string) {
    const stringData = patchFormat(data);
    return (
      await query(
        `UPDATE boards SET ${stringData} WHERE id = $1 RETURNING *;`,
        [boardId]
      )
    ).rows[0];
  }
  
  export async function getAllBoard(): Promise<Board[]> {
    return (await query("SELECT * FROM boards")).rows;
  }

