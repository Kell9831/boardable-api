import { z } from "zod";

export const boardSchema = z.object({
  userId: z.number().int().positive().optional(),
  title: z.string({
    required_error: "title es requerido.",
    invalid_type_error: "title debe ser un string.",
  }),
  color: z.string({
    invalid_type_error: "Color must be a string",
  }).refine((value) => /^#([0-9a-f]{6})$/i.test(value), {
    message: "Color must be a valid hexadecimal color code (e.g., '#FFFFFF')",
  }).default("#FFFFFF"),
  created_at: z
    .string({
      required_error: "CreatedAt es requerido.",
      invalid_type_error: "CreatedAt debe ser una cadena de fecha y hora.",
    })
    .optional(),
 
});

export type BoardParams = z.infer<typeof boardSchema>;
export type Board = BoardParams & { id: number };
export const editBoardSchema = boardSchema;