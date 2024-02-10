import express from "express";
import { authenticateHandler } from "../middlewares/authenticate";
import { validationHandler } from "../middlewares/validation";
import { deleteBoard, editBoard, getBoardById, newBoard } from "../services/board-service";
import { boardSchema , editBoardSchema } from "../models/board";
import { ApiError } from "../middlewares/error";
import { getAllBoardsByUserId } from "../data/board-data";

export const boardRouter = express.Router();

boardRouter.get("/", authenticateHandler, async (req, res, next) => {
  try {
    const userId = req.userId!; 
    const boards = await getAllBoardsByUserId(userId);

    res.json({
      ok: true,
      message: "Lista de tableros del usuario",
      data: boards,
    });
  } catch (error) {
    next(error);
  }
});

boardRouter.get('/:id', async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const response = await getBoardById(boardId);
    if (!response.rows || response.rows.length === 0) {
      return res.status(404).json({ error: 'Board not found' });
    }
    const board = response.rows[0];

    res.status(200).json({ ok: true, data: board });
  } catch (error) {
    next(error);
  }
});

boardRouter.post(
    "/",
    authenticateHandler,
    validationHandler(boardSchema),
    async (req, res, next) => {
      try {
        const userId = req.userId!;
        const post = await newBoard(req.body, userId);
        res.status(201).json({ ok: true, data: post });
      } catch (error) {
        next(error);
      }
    }
  );


  boardRouter.patch(
    "/:boardId",
    authenticateHandler,
    validationHandler(editBoardSchema),
    async (req, res, next) => {
      try {
        const boardId = req.params["boardId"];
        const userId = req.userId;
        const board = await getBoardById(boardId);
        if (board.rowCount === 0) {
          return next(new ApiError("board no encontrado.", 401));
        }
        if (userId !== board.rows[0].userid) {
          return next(new ApiError("Usuario no autorizado.", 401));
        }
        const newPost = await editBoard(req.body, boardId);
        res.status(200).json({
          ok: true,
          data: newPost,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  boardRouter.delete("/:boardId", authenticateHandler, async (req, res, next) => {
    try {
      const boardId = req.params.boardId; 
      await deleteBoard(boardId);
      res.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  });
  