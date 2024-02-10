import {  CardParams } from "../models/card";
import * as cardDB from "../data/card-data";

export async function newCard(data: CardParams, listId: number | string) {
    return await cardDB.newCard(data, listId);
  }

export async function getCardById (listId: string) {
  return await cardDB.getCardById(listId);
}

export async function editCard(data: CardParams, cardId: string) {
  return await cardDB.editCard(data, cardId);
}

export async function deleteCard(cardId: number | any): Promise<void> {
  return await cardDB.deleteCard(cardId);
}
