import express from "express";
import { cardSchema, editCardSchema } from "../models/card";
import { authenticateHandler } from "../middlewares/authenticate";
import { validationHandler } from "../middlewares/validation";
import { getAllCardsByListId } from "../data/card-data";
import { ApiError } from "../middlewares/error";
import { deleteCard, editCard, getCardById, newCard } from "../services/card-service";


export const cardsRouter = express.Router();

cardsRouter.post(
    "/lists/:listId/cards",
    authenticateHandler,
    validationHandler(cardSchema),
    async (req, res, next) => {
        try {
            const listId = req.params.listId;
            const card = await newCard(req.body, listId);
            res.status(201).json({ ok: true, data: card });
        } catch (error) {
            next(error);
        }
    }
);

cardsRouter.get("/lists/:listId/cards", authenticateHandler, async (req, res, next) => {
    try {

        const listId = req.params.listId;
        const cards = await getAllCardsByListId(listId);

        res.json({
            ok: true,
            message: "Lista de cards en la lista",
            data: cards,
        });
    } catch (error) {
        next(error);
    }
});

cardsRouter.patch(
    "/cards/:cardId",
    authenticateHandler,
    validationHandler(editCardSchema),
    async (req, res, next) => {
        try {
            const cardId = req.params.cardId;
            
            const card = await getCardById(cardId);
            if (!card || card.rows.length === 0) {
                return next(new ApiError("Tarjeta no encontrada.", 404));
            }

            const updatedCard = await editCard(req.body, cardId);
            res.status(200).json({
                ok: true,
                data: updatedCard,
            });
        } catch (error) {
            next(error);
        }
    }
);

cardsRouter.delete("/cards/:cardId", authenticateHandler, async (req, res, next) => {
    try {
      const cardId = req.params.cardId; 
      await deleteCard(cardId);
      res.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  });
  