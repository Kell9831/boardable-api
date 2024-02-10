import { z } from "zod";

export const listSchema = z.object({
  title: z.string({
    required_error: "title es requerido.",
    invalid_type_error: "title debe ser un string.",
  }),
  board_id: z.number().int().positive().optional(),
});

export type ListParams = z.infer<typeof listSchema>;
export type List = ListParams & { id: number };
export const editListSchema = listSchema;
