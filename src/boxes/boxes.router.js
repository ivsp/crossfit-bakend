import express from "express";
import {
  createEventCtrl,
  getEventsCtrl,
  modifyEventCtrl,
} from "./boxes.controller.js";

const router = express.Router();

router
  .route("/")
  .post(createEventCtrl)
  .patch(modifyEventCtrl)
  .get(getEventsCtrl);

export default router;
