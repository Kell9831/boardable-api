import express from "express";
import { authenticateHandler } from "../middlewares/authenticate";
import { deleteUser, getUser, updateUser } from "../services/user-services";

export const profileRouter = express.Router();

profileRouter.get("/", authenticateHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    console.log(userId);
    const profile = await getUser(userId);
    res.status(200).json({
      ok: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
});

profileRouter.patch("/", authenticateHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    const { username, password, name, email } = req.body;

    const newProfile = await updateUser(userId, username, password, name, email);

    res.status(200).json({
      ok: true,
      data: newProfile,
    });
  } catch (error) {
    next(error);
  }
});

profileRouter.delete("/", authenticateHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    await deleteUser(userId);
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
});
