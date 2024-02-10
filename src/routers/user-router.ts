import express from "express";
import {
  getAllUsers,
  getUser,
} from "../services/user-services";
import { ApiError } from "../middlewares/error";
import { authenticateHandler } from "../middlewares/authenticate";

const userRouter = express.Router();

userRouter.get("/user", authenticateHandler, async (req, res, next) => {
  const userId = req.userId as number;
  const user = await getUser(userId);

  if (user) {
    res.json(user);
  } else {
    next(new ApiError("No autorizado", 401));
  }
});

userRouter.get(
  "/users",
  authenticateHandler,
  async (req, res, next) => {
    const users = await getAllUsers();

    res.json({
      ok: true,
      message: "Lista de usuarios",
      data: users,
    });
  }
);


export default userRouter;
