import express from "express";
import {
  createEventCtrl,
  getEventsCtrl,
  modifyEventCtrl,
} from "./boxes.controller.js";
import { uploadMiddleware } from "../middleware/file-save.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(uploadMiddleware.single("file"), createEventCtrl)
  .patch(uploadMiddleware.single("file"), modifyEventCtrl)
  .get(getEventsCtrl);

export default router;
