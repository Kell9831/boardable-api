import { query } from "../db";
import { Card, CardParams } from "../models/card";
import { patchFormat } from "../utils/util";

export async function newCard(data: CardParams, listId: number | string) {
  return (
    await query(
      `INSERT INTO cards (title, list_id) 
      VALUES ($1, $2) 
      RETURNING id, title, list_id;`,
      [data.title, listId]
    )
  ).rows[0];
}

export async function getCardById(cardId: string) {
  return await query(`SELECT * FROM cards WHERE id = $1;`, [cardId]);
}

export async function editCard(data: CardParams, cardId: string) {
  const stringData = patchFormat(data);
  return (
    await query(
      `UPDATE cards SET ${stringData} WHERE id = $1 RETURNING *;`,
      [cardId]
    )
  ).rows[0];
}

export async function getAllCardsByListId(listId: string): Promise<Card[]> {
  return (
    await query("SELECT * FROM cards WHERE list_id = $1", [listId])
  ).rows;
}

export async function deleteCard(cardId: number): Promise<void> {
  await query("DELETE FROM cards WHERE id = $1", [cardId]);
}
