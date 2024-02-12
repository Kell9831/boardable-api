import { User,UserParams } from "../models/user";
import bcrypt from "bcrypt";
import * as userDB from "../data/user-data";
import { ApiError } from "../middlewares/error";
import { costFactor } from "../utils/const-util";

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

 
  const hashedPassword = await bcrypt.hash(password, costFactor);
  const newUser = await userDB.createUser(username, hashedPassword,name, email);
  return newUser;
}

export async function updateUser(
  id: number,
  username: string,
  password: string,
  name: string,
  email: string
): Promise<User | undefined> {
  // Verificar si los nuevos valores de username, name y email ya existen en la base de datos
  const existingUser = await userDB.getUserByUsernameOrEmail(username, email);
  if (existingUser && existingUser.id !== id) {
    throw new Error("El nombre de usuario o correo electrónico ya está en uso.");
  }


  const hashedPassword = await bcrypt.hash(password, costFactor);

  // Actualizar el usuario en la base de datos
  const updatedUser = await userDB.updateUser(id, username, hashedPassword, name, email);

  if (!updatedUser) {
    throw new ApiError("Usuario no encontrado", 404);
  }

  return updatedUser;
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

