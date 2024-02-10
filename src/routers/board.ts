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

    // Obtener el tablero por su ID
    const response = await getBoardById(boardId);
    
    // Verificar si se encontró el tablero
    if (!response.rows || response.rows.length === 0) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Extraer los datos del primer tablero encontrado
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
        const postId = req.params["boardId"];
        const userId = req.userId;
        const userRole = req.userRole;
        console.log(userRole);
        console.log("id desde path", userId);
        const post = await getBoardById(postId);
        if (post.rowCount === 0) {
          return next(new ApiError("board no encontrado.", 401));
        }
        console.log("id desde query", post.rows[0].userid);
        if (userId !== post.rows[0].userid) {
          return next(new ApiError("Usuario no autorizado.", 401));
        }
        const newPost = await editBoard(req.body, postId);
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
      const boardId = req.params.boardId; // Obtener el boardId de los parámetros de la solicitud
      await deleteBoard(boardId); // Llamar a la función deleteBoard con el boardId proporcionado
      res.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  });
  