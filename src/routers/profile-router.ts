import express from "express";
import {
  deleteProfile,
  editProfile,
  getProfileById,
} from "../services/profile-service";
import { authenticateHandler } from "../middlewares/authenticate";

export const profileRouter = express.Router();

profileRouter.get("/", authenticateHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    console.log(userId);
    const profile = await getProfileById(userId);
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
    const data = req.body;

    const newProfile = await editProfile(data, userId);

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
    await deleteProfile(userId);
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
});
