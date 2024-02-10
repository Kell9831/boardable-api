import * as db from "../data/profile-data";
import { editUserParams } from "../models/user";

export async function getProfileById(userId: number) {
  return await db.getProfileById(userId);
}

export async function editProfile(data: editUserParams, userId: number) {
  return await db.editProfile(data, userId);
}

export async function deleteProfile(userId: number) {
  return await db.deleteProfile(userId);
}
