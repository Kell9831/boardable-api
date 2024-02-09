import { User,UserParams } from "../models/user";
import bcrypt from "bcrypt";
import * as userDB from "../data/user-data";
import { ApiError } from "../middlewares/error";

export async function getAllUsers(): Promise<User[]> {
  return await userDB.getAllUsers();
}

export async function getUser(id: number): Promise<User | undefined> {
  return await userDB.getUser(id);
}

export async function createUser(data: UserParams): Promise<User> {
  const { username, password,name,email } = data;

  const user = await userDB.getUserByUsername(username);

  if (user) {
    throw new ApiError("El username ya está registrado", 400);
  }

  const costFactor = 10;
  const hashedPassword = await bcrypt.hash(password, costFactor);
  const newUser = await userDB.createUser(username, hashedPassword,name, email);
  return newUser;
}

export async function updateUser(
  id: number,
  username: string,
  password: string,
  name:string,
  email: string,
): Promise<User | undefined> {
  const updatedUser = await userDB.updateUser(id, username, password,name,email);

  if (!updatedUser) {
    throw new ApiError("Usuario no encontrado", 404);
  }
  const costFactor = 10;
  const hashedPassword = await bcrypt.hash(password, costFactor);
  const updateUser = await userDB.updateUser(id,username, hashedPassword,name, email);
  return updateUser;
}


export async function validateCredentials(
  credentials: UserParams
): Promise<User> {
  const { username, password } = credentials;
  const user = await userDB.getUserByUsername(username);

  const isValid = await bcrypt.compare(password, user?.password || "");

  if (!user || !isValid) {
    throw new ApiError("Credenciales incorrectas", 400);
  }

  return user;
}


export async function deleteUser(id: number): Promise<void> {
  const userToDelete = await userDB.getUser(id);

  if (!userToDelete) {
    throw new ApiError("Usuario no encontrado", 404);
  }

  await userDB.deleteUser(id);
}

