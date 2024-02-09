import { Board, BoardParams } from "../models/board";
import * as boardDB from "../data/board-data";

export async function newBoard(data: BoardParams, userId: number) {
  return await boardDB.newBoard(data, userId);
}

export async function getBoardById(postId: string) {
  return await boardDB.getBoardById(postId);
}

export async function editBoard(data: BoardParams, postsId: string) {
  return await boardDB.editBoard(data, postsId);
}

export async function getAllBoard(): Promise<Board[]> {
  return await boardDB.getAllBoard();
}