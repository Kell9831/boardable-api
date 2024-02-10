import { z } from "zod";

export const cardSchema = z.object({
  title: z.string({
    required_error: "title es requerido.",
    invalid_type_error: "title debe ser un string.",
  }),
  list_id: z.number().int().positive(),
});

export type CardParams = z.infer<typeof cardSchema>;
export type Card = CardParams & { id: number };
export const editCardSchema = cardSchema;
