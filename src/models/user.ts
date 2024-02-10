import { z } from "zod";

export const userSchema = z.object({
  username: z.string({
    required_error: "Username es requerido",
    invalid_type_error: "Username debe ser un string",
  }),
  password: z
    .string()
    .min(6, "Password debe tener al menos 6 caracteres")
    .refine((value) => value !== null, {
      message: "Password es requerido",
    }),
  name: z
    .string({
      required_error: "Name es requerido",
      invalid_type_error: "Name debe ser un string",
    })
    .refine((value) => value !== undefined ? value : null).optional(),
  email: z
    .string({
      required_error: "Email es requerido",
      invalid_type_error: "Email debe ser un string",
    })
    .email({
      message: "Email debe tener un formato de dirección de correo electrónico válido",
    })
    .refine((value) => value !== undefined ? value : null).optional(), 
});

export type UserParams = z.infer<typeof userSchema>;
export type User = UserParams & { id: number };

export const editUserSchema = userSchema.omit({
  username: true,
  password: true,
  name: true,
  email:true,
});

export type editUserParams = z.infer<typeof editUserSchema>;



