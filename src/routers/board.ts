import express from "express";
import { authenticateHandler } from "../middlewares/authenticate";
import { validationHandler } from "../middlewares/validation";
import { editBoard, getAllBoard, getBoardById, newBoard } from "../services/board-service";
import { boardSchema , editBoardSchema } from "../models/board";
import { ApiError } from "../middlewares/error";

export const boardRouter = express.Router();

boardRouter.get(
  "/",
  authenticateHandler,
  async (req, res, next) => {
    const users = await getAllBoard();

    res.json({
      ok: true,
      message: "Lista de tableros",
      data: users,
    });
  }
);

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