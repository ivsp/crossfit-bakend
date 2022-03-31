import express from "express";
import {
  createEventCtrl,
  getEventsCtrl,
  modifyEventCtrl,
} from "./boxes.controller.js";
import { upload } from "../middleware/file-save.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(upload.single("file"), createEventCtrl)
  .patch(upload.single("file"), modifyEventCtrl)
  .get(getEventsCtrl);

export default router;
