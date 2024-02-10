import express from "express";
import { authenticateHandler } from "../middlewares/authenticate";
import { editListSchema, listSchema } from "../models/list";
import { validationHandler } from "../middlewares/validation";
import { getAllListsByBoardId } from "../data/list-data";
import { deleteList, editList, getListById, newList } from "../services/list-service";
import { ApiError } from "../middlewares/error";
import { getBoardById } from "../services/board-service";

export const listsRouter = express.Router();

listsRouter.post(
    "/boards/:boardId/lists",
    authenticateHandler,
    validationHandler(listSchema),
    async (req, res, next) => {
      try {
        const boardId = req.params.boardId; 
        const post = await newList(req.body, boardId);
        res.status(201).json({ ok: true, data: post });
      } catch (error) {
        next(error);
      }
    }
  );
  

  listsRouter.get("/boards/:id/lists", authenticateHandler, async (req, res, next) => {
    try {
  

    const boardId = req.params.id;
    const lists = await getAllListsByBoardId(boardId);
  
      res.json({
        ok: true,
        message: "Lista de listas en el tablero",
        data: lists,
      });
    } catch (error) {
      next(error);
    }
  });

  listsRouter.patch(
    "/lists/:listId",
    authenticateHandler,
    validationHandler(editListSchema),
    async (req, res, next) => {
      try {
        const listId = req.params.listId;
        const userId = req.userId;
  
       const list = await getListById(listId);
        if (!list || list.rows.length === 0) {
          return next(new ApiError("Lista no encontrada.", 404));
        }
        
        const board = await getBoardById(list.rows[0].board_id);
        if (!board || board.rows.length === 0) {
          return next(new ApiError("Tablero no encontrado.", 404));
        }
  
        if (userId !== board.rows[0].userid) {
          return next(new ApiError("Usuario no autorizado.", 403));
        }
  
        // Editar la lista
        const updatedList = await editList(req.body, listId);
        res.status(200).json({
          ok: true,
          data: updatedList,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
  listsRouter.delete("/lists/:listId", authenticateHandler, async (req, res, next) => {
    try {
      const listId = req.params.listId; 
      await deleteList(listId);
      res.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  });
  


  export default listsRouter;