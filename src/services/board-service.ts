import {  BoardParams } from "../models/board";
import * as boardDB from "../data/board-data";

export async function newBoard(data: BoardParams, userId: number) {
  return await boardDB.newBoard(data, userId);
}

export async function getBoardById(boardId: string) {
  return await boardDB.getBoardById(boardId);
}

export async function editBoard(data: BoardParams, boardId: string) {
  return await boardDB.editBoard(data, boardId);
}

export async function deleteBoard(boardId: number | any): Promise<void> {
  return await boardDB.deleteBoard(boardId);
}

