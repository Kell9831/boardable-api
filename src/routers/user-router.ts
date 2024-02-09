import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
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

userRouter.patch(
  "/users/:id",
  authenticateHandler,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password,name, email } = req.body;
      const updatedUser = await updateUser(
        parseInt(id),
        username,
        password,
        name,
        email
      );

      if (updatedUser) {
        const updatedData = {
          id: updatedUser.id,
          username: updatedUser.username,
          name:updateUser.name,
          email: updatedUser.email,
        };

        res.json({
          ok: true,
          message: "Usuario actualizado exitosamente",
          data: updatedData,
        });
      } else {
        res.status(404).json({
          ok: false,
          message: "Usuario no encontrado",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/users/:id",
  authenticateHandler,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteUser(parseInt(id));
      res.json({ ok: true, message: "Usuario eliminado" });
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
