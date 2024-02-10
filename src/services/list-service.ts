import {  ListParams } from "../models/list";
import * as listDB from "../data/list-data";

export async function newList(data: ListParams, boardId: number | string) {
    return await listDB.newList(data, boardId);
  }

export async function getListById (listId: string) {
  return await listDB.getListById(listId);
}

export async function editList(data: ListParams, listId: string) {
  return await listDB.editList(data, listId);
}

export async function deleteList(boardId: number | any): Promise<void> {
  return await listDB.deleteList(boardId);
}
